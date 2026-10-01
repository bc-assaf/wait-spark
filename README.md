# Wait Spark


## Supabase
Permissions to use Message Queue

```sql
GRANT USAGE ON SCHEMA pgmq TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON pgmq.q_scraping_jobs TO service_role;
GRANT USAGE, SELECT ON SEQUENCE pgmq.q_scraping_jobs_msg_id_seq TO service_role;



GRANT USAGE ON SCHEMA pgmq TO service_role;
GRANT ALL ON ALL TABLES IN SCHEMA pgmq TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA pgmq TO service_role;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA pgmq GRANT ALL ON TABLES TO service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA pgmq GRANT ALL ON SEQUENCES TO service_role;
```