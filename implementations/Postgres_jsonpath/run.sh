#/bin/bash
set -euo pipefail

readonly document="$(cat)"
readonly selector="$1"

if ! pg_ctl status > /dev/null; then
    pg_ctl start > /dev/null
fi

# Pipe through json.tool to catch empty responses as errors
psql -tc "SELECT array_to_json(array_agg(r.to_json)) FROM (SELECT to_json(jsonb_path_query('${document}', '${selector}'))) r;" | python3 -m json.tool
