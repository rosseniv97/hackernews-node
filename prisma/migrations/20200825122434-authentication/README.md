# Migration `20200825122434-authentication`

This migration has been generated by Rosen Ivanov at 8/25/2020, 3:24:34 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Link" ADD COLUMN     "posteById" INTEGER

CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
)

CREATE UNIQUE INDEX "User.email_unique" ON "User"("email")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200825084640-change..20200825122434-authentication
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
-    provider = "sqlite" 
-    url = "***"
+    provider = "sqlite"
+    url = "***"
 }
 generator client {
     provider = "prisma-client-js"
@@ -12,5 +12,15 @@
     createdAt   DateTime @default(now())
     description String
     url         String
     additional  String @default("null")
-  }
+    postedBy    User?    @relation(fields: [posteById], references: [id])
+    posteById   Int?
+}
+
+model User {
+    id       Int    @id @default(autoincrement())
+    name     String
+    email    String @unique
+    password String
+    links    Link[]
+}
```


