-- AlterEnum
ALTER TYPE "TokenType" ADD VALUE 'PASSWORD_RESET_TOKEN';

-- CreateIndex
CREATE INDEX "user_token_type_idx" ON "Token"("userId", "type");
