CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_digest TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMP NULL
);

INSERT INTO users (email, password_digest, created_at, updated_at, is_active, last_login_at)
VALUES
  ('dev@example.com', '$2a$12$PQRaXTj3zd.HGWzPBYXZq.tOeAek0zMh9Octhc6u87n0S64R5k3Se', now(), now(), true, now())
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS user_tokens (
  user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

INSERT INTO user_tokens (user_id, token, expires_at)
VALUES (
  1,
  '12345',
  now() + interval '14 days'
);

CREATE TABLE IF NOT EXISTS notes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  last_edited TIMESTAMP NOT NULL,
  is_archived BOOLEAN DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

INSERT INTO notes (user_id, title, content, last_edited, is_archived, created_at, updated_at) VALUES
  (1, 'React Performance Optimization',
    'Key performance optimization techniques:\n\n1. Code Splitting\n- Use React.lazy() for route-based splitting\n- Implement dynamic imports for heavy components\n\n2. Memoization\n- useMemo for expensive calculations\n- useCallback for function props\n- React.memo for component optimization\n\n3. Virtual List Implementation\n- Use react-window for long lists\n- Implement infinite scrolling\n\nTODO: Benchmark current application and identify bottlenecks',
    '2024-10-29T10:15:00Z', false, now(), now()),
  (1, 'Japan Travel Planning',
    'Japan Trip Planning - Spring 2025\n\nItinerary Draft:\nWeek 1: Tokyo\n- Shibuya and Harajuku\n- TeamLab Digital Art Museum\n- Day trip to Mount Fuji\n\nWeek 2: Kyoto & Osaka\n- Traditional temples\n- Cherry blossom viewing\n- Food tour in Osaka\n\nBudget: $3000\nAccommodation: Mix of hotels and traditional ryokans\nJR Pass: 14 days\n\nTODO: Book flights 6 months in advance',
    '2024-10-28T16:45:00Z', false, now(), now()),
  (1, 'Favorite Pasta Recipes',
    'Classic Italian Recipes:\n\n1. Carbonara\n- Eggs, pecorino, guanciale\n- No cream ever!\n- Save pasta water\n\n2. Cacio e Pepe\n- Pecorino Romano\n- Fresh black pepper\n- Technique is crucial\n\n3. Arrabbiata\n- San Marzano tomatoes\n- Fresh garlic\n- Red pepper flakes\n\nNote: Always use high-quality ingredients',
    '2024-10-27T14:30:00Z', false, now(), now()),
  (1, 'TypeScript Migration Guide',
    'Project migration steps:\n\n1. Initial Setup\n- Install TypeScript dependencies\n- Configure tsconfig.json\n- Set up build pipeline\n\n2. Migration Strategy\n- Start with newer modules\n- Add type definitions gradually\n- Use ''any'' temporarily for complex cases\n\n3. Testing Approach\n- Update test configuration\n- Add type testing\n- Validate build process\n\nDeadline: End of Q4 2024',
    '2024-10-26T09:20:00Z', true, now(), now()),
  (1, 'Weekly Workout Plan',
    'Monday: Upper Body\n- Bench Press 4x8\n- Rows 4x10\n- Shoulder Press 3x12\n- Pull-ups 3 sets\n\nWednesday: Lower Body\n- Squats 4x8\n- Romanian Deadlifts 3x10\n- Lunges 3x12 each\n- Calf Raises 4x15\n\nFriday: Full Body\n- Deadlifts 3x5\n- Push-ups 3x12\n- Leg Press 3x12\n- Core Work\n\nCardio: Tuesday/Thursday - 30 min run',
    '2024-10-25T18:10:00Z', false, now(), now()),
  (1, 'Gift Ideas',
    'Birthday and Holiday Gift List:\n\nMom:\n- Cooking class subscription\n- Kindle Paperwhite\n- Spa day package\n\nDad:\n- Golf lessons\n- Wireless earbuds\n- BBQ accessories\n\nSister:\n- Art supplies set\n- Yoga mat kit\n- Coffee subscription\n\nBudget per person: $150-200',
    '2024-10-20T11:30:15Z', true, now(), now()),
  (1, 'React Component Library',
    'Custom Component Library Structure:\n\n1. Basic Components\n- Button\n- Input\n- Card\n- Modal\n\n2. Form Components\n- FormField\n- Select\n- Checkbox\n- RadioGroup\n\n3. Layout Components\n- Container\n- Grid\n- Flex\n\nAll components need:\n- TypeScript definitions\n- Unit tests\n- Storybook documentation\n- Accessibility support',
    '2024-10-15T14:23:45Z', true, now(), now()),
  (1, 'Meal Prep Ideas',
    'Weekly Meal Prep Plan:\n\nBreakfast Options:\n- Overnight oats\n- Egg muffins\n- Smoothie packs\n\nLunch Containers:\n- Greek chicken bowl\n- Buddha bowls\n- Tuna pasta salad\n\nSnacks:\n- Cut vegetables\n- Mixed nuts\n- Greek yogurt parfait\n\nPrep Time: Sunday 2-4pm\nStorage: Glass containers\nLasts: 4-5 days',
    '2024-10-12T09:45:15Z', false, now(), now()),
  (1, 'Reading List',
    'Current Reading Queue:\n\n1. Technical Books\n- Clean Architecture by Robert Martin\n- Designing Data-Intensive Applications\n- TypeScript Design Patterns\n\n2. Personal Development\n- Deep Work by Cal Newport\n- Atomic Habits\n- The Psychology of Money\n\nCurrently Reading: Clean Architecture\nNext Up: Deep Work\n\nGoal: One book per month',
    '2024-10-05T12:20:30Z', false, now(), now()),
  (1, 'Fitness Goals 2025',
    '2025 Fitness Objectives:\n\n1. Strength Goals\n- Bench press: 225 lbs\n- Squat: 315 lbs\n- Deadlift: 405 lbs\n\n2. Cardio Goals\n- Run half marathon\n- 5k under 25 minutes\n\n3. Habits\n- Gym 4x per week\n- Daily 10k steps\n- Sleep 7+ hours\n\nTrack all workouts in Strong app',
    '2024-09-22T07:30:00Z', false, now(), now());

CREATE TABLE IF NOT EXISTS tags (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

INSERT INTO tags (name)
VALUES
  ('Dev'),
  ('React'),
  ('Travel'),
  ('Personal'),
  ('Cooking'),
  ('Recipes'),
  ('TypeScript'),
  ('Fitness'),
  ('Health'),
  ('Shopping')
ON CONFLICT (name) DO NOTHING;

CREATE TABLE IF NOT EXISTS note_tags (
  note_id INTEGER NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
  tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (note_id, tag_id)
);

INSERT INTO note_tags (note_id, tag_id) VALUES
  (1, (SELECT id FROM tags WHERE name = 'Dev')),
  (1, (SELECT id FROM tags WHERE name = 'React'));

INSERT INTO note_tags (note_id, tag_id) VALUES
  (2, (SELECT id FROM tags WHERE name = 'Travel')),
  (2, (SELECT id FROM tags WHERE name = 'Personal'));

INSERT INTO note_tags (note_id, tag_id) VALUES
  (3, (SELECT id FROM tags WHERE name = 'Cooking')),
  (3, (SELECT id FROM tags WHERE name = 'Recipes'));

INSERT INTO note_tags (note_id, tag_id) VALUES
  (4, (SELECT id FROM tags WHERE name = 'Dev')),
  (4, (SELECT id FROM tags WHERE name = 'React')),
  (4, (SELECT id FROM tags WHERE name = 'TypeScript'));

INSERT INTO note_tags (note_id, tag_id) VALUES
  (5, (SELECT id FROM tags WHERE name = 'Fitness')),
  (5, (SELECT id FROM tags WHERE name = 'Health'));

INSERT INTO note_tags (note_id, tag_id) VALUES
  (6, (SELECT id FROM tags WHERE name = 'Personal')),
  (6, (SELECT id FROM tags WHERE name = 'Shopping'));

INSERT INTO note_tags (note_id, tag_id) VALUES
  (7, (SELECT id FROM tags WHERE name = 'Dev')),
  (7, (SELECT id FROM tags WHERE name = 'React'));

INSERT INTO note_tags (note_id, tag_id) VALUES
  (8, (SELECT id FROM tags WHERE name = 'Cooking')),
  (8, (SELECT id FROM tags WHERE name = 'Health')),
  (8, (SELECT id FROM tags WHERE name = 'Recipes'));

INSERT INTO note_tags (note_id, tag_id) VALUES
  (9, (SELECT id FROM tags WHERE name = 'Personal')),
  (9, (SELECT id FROM tags WHERE name = 'Dev'));

INSERT INTO note_tags (note_id, tag_id) VALUES
  (10, (SELECT id FROM tags WHERE name = 'Fitness')),
  (10, (SELECT id FROM tags WHERE name = 'Health')),
  (10, (SELECT id FROM tags WHERE name = 'Personal'));
