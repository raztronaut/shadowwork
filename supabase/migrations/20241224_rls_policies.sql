-- Enable RLS
ALTER TABLE "JournalEntry" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Goal" ENABLE ROW LEVEL SECURITY;

-- Create policies for JournalEntry
CREATE POLICY "Users can view their own journal entries"
ON "JournalEntry"
FOR SELECT
USING ("userId" = current_user);

CREATE POLICY "Users can create their own journal entries"
ON "JournalEntry"
FOR INSERT
WITH CHECK ("userId" = current_user);

CREATE POLICY "Users can update their own journal entries"
ON "JournalEntry"
FOR UPDATE
USING ("userId" = current_user)
WITH CHECK ("userId" = current_user);

CREATE POLICY "Users can delete their own journal entries"
ON "JournalEntry"
FOR DELETE
USING ("userId" = current_user);

-- Create policies for Goal
CREATE POLICY "Users can view their own goals"
ON "Goal"
FOR SELECT
USING ("userId" = current_user);

CREATE POLICY "Users can create their own goals"
ON "Goal"
FOR INSERT
WITH CHECK ("userId" = current_user);

CREATE POLICY "Users can update their own goals"
ON "Goal"
FOR UPDATE
USING ("userId" = current_user)
WITH CHECK ("userId" = current_user);

CREATE POLICY "Users can delete their own goals"
ON "Goal"
FOR DELETE
USING ("userId" = current_user); 