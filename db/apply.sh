#!/bin/bash

atlas schema apply \
  -u "postgres://postgres:password@:5432/postgres?sslmode=disable" \
  --to file://db.sql \
  --dev-url "docker://postgres/15/test" \
  --auto-approve