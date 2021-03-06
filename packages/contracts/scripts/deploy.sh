#!/bin/bash

set -e

MIGRATIONS_DIR=./migrations

run() {

    migrations=$(find "${MIGRATIONS_DIR}" -type f | sort)

    for file in $migrations; do
        f=$(basename "$file")
        ext=${f##*.}
        if [[ "$ext" == "ts" ]]; then
            echo "$f"
            npx ts-node "${MIGRATIONS_DIR}/${f}"
        fi
    done
}

run
