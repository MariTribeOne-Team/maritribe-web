INSERT INTO "QaUser" (
  "id",
  "email",
  "name",
  "passwordHash",
  "role",
  "isActive",
  "createdAt",
  "updatedAt"
)
VALUES (
  gen_random_uuid()::text,
  'qa@maritribe.test',
  'QA Reviewer',
  'scrypt:ac0af1512640485ea3a97d3a9b8fd4dc:6f901956a37eb12d2bb4420fb43a0012095183f9ed16d885d63dc6d65cd8419ddd2ecad7293c25f0218c80744c24f486c8ae7dff1b095d0b0ef2005ac49566c6',
  'QA_REVIEWER',
  true,
  NOW(),
  NOW()
)
ON CONFLICT ("email") DO UPDATE
SET
  "name" = EXCLUDED."name",
  "passwordHash" = EXCLUDED."passwordHash",
  "role" = EXCLUDED."role",
  "isActive" = EXCLUDED."isActive",
  "updatedAt" = NOW();
