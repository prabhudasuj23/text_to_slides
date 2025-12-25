
export const PROMPT_TRAINING_EXAMPLES = [
 {
  "filename": "image_2.png",
  "prompt_data": {
    "master_prompt": "Infographic titled 'Section B — FOREIGN KEY Relationships' at the top in large white sans-serif font against a dark, glowing technical background with subtle circuit board patterns. Below the title, a three-column structure connected by large glowing cyan arrows moving left to right. \n\nColumn 1 (Left, titled 'Definition'): A dark blue glowing panel with white text block: 'A FOREIGN KEY in the child table points to the PRIMARY KEY of the parent table, guaranteeing that every child row references an existing parent.'. Below text, two glowing blue database table icons linked by multiple lines. Left table labeled 'PARENT TABLE' with a crown icon and 'PRIMARY KEY' highlighted. Right table labeled 'CHILD TABLE' with a key/link icon and 'FOREIGN KEY' highlighted. \n\nColumn 2 (Middle, titled 'Database Engine’s Role'): A panel with a central glowing blue shield icon containing a gear. Below icon, white text: 'Maintains this invariant on every insert, update, or delete, preventing orphaned records automatically.'. Below text, a visual diagram showing a glowing blue 'orphaned record' block with a broken link chain icon moving towards a glowing red brick wall with an 'X' icon, being blocked. \n\nColumn 3 (Right, titled 'Performance & Indexing'): A panel with a glowing blue speedometer gauge icon with an upward arrow. Below icon, white text: 'Defining the constraint also creates an index on the foreign column, speeding joins and cascading actions.'. Below text, a diagram showing two smaller tables joining into a larger table, with a magnifying glass icon labeled 'INDEX' highlighting the resulting table. \n\nThe overall aesthetic is dark mode cyberpunk technology, with neon cyan, blue, and subtle red light accents, clean vector lines, and digital glow effects. All text is crisp white or light blue sans-serif.",
    "style_tokens": ["technical infographic", "dark mode", "neon glow", "cyberpunk UI", "data visualization", "flowchart"],
    "color_palette": ["cyan neon hex#00FFFF", "dark blue background hex#0A0F2D", "white text hex#FFFFFF", "red alert glow hex#FF3333"],
    "layout_type": "3-column horizontal flow"
  }
},
  {
  "filename": "image_3.png",
  "prompt_data": {
    "master_prompt": "Technical infographic titled 'Referential Integrity & Data Lifecycle' in large white serif font, with subtitle 'Governing Relationships & Enforcing Business Policy' below it. The background is dark blue technology circuit patterns with a digital glow. The main visual is a left-to-right flowchart. \n\nStep 1 (Left): A glowing isometric cube labeled 'P' inside another cube, titled '1. Parent Existence', with a green checkmark icon. A cyan arrow points right. \n\nStep 2 (Middle): Two connected glowing isometric cubes labeled 'C' and 'P', titled '2. Child Insertion (Dependency)'. Below them, text '2. Child Insertion' and 'Parent must exist first'. A glowing shield with padlock icon is below this text. \n\nStep 3 (Right, Split Path): A large cyan arrow splits into two paths under title '3. Parent Deletion & Child Handling'. Top path arrow leads to a 'P' cube with a red cross-out, pointing to a 'C' cube with a red 'X', labeled 'CASCADE (Automatic Deletion)'. Bottom path arrow leads to a 'P' cube with a shield icon, OR a 'C' cube labeled 'NULL', labeled 'RESTRICT / SET NULL (Policy Enforcement)' and text 'Prevent orphaned data or reassign'. \n\nFar Right Panel: A separate dark glowing panel titled 'Codified Business Policy' with gear icons. Text: 'ON DELETE actions embed rules directly in the schema.'. \n\nBottom Center Panel: A wide glowing panel with a padlock icon titled 'Atomic Enforcement'. Text: 'Rules enforced atomically; concurrent transactions never see broken relationships.'. The overall style is clean digital illustration with neon blue, cyan, green, and red signal colors.",
    "style_tokens": ["technical flowchart", "isometric icons", "dark mode", "neon typography", "data governance visualization"],
    "color_palette": ["cyan flow lines", "dark tech background", "green success indicator", "red failure indicator"],
    "layout_type": "Flowchart with branching paths and summary sidebar"
  }
},
  {
  "filename": "image_4.png",
  "prompt_data": {
    "master_prompt": "Infographic titled 'Section D — DEFAULT Values & Automated Consistency' with subtitle 'Leveraging database-level defaults to streamline application logic and ensure data uniformity.' Dark technical background. \n\nLeft Section (Titled 'Mechanism: Automated Value Injection'): A vertical flow diagram. Top box '< /> CLIENT APPLICATION' has arrow labeled 'INSERT Statement (Column Omitted)' pointing to a large 'DATABASE ENGINE' box containing a gear/clock icon. An arrow from the engine labeled 'e.g., status DEFAULT 'pending'' points to a 'APPLY DEFAULT VALUE' button. This points to a 'TABLE ROW (Populated)' visualization showing columns 'id', 'data', 'status', with the 'status' cell highlighted showing 'pending'. Bottom text: 'The engine automatically supplies the predetermined value, removing the need for explicit client-side handling.'. \n\nRight Section (Titled 'Common Patterns & Strategic Use Cases'): A 2x2 grid of glowing panels. Top-Left 'TIMESTAMPS (Audit & Tracking)' with clock icon, showing code `created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP` and bullet points with a small line graph. Top-Right 'COUNTERS (Initialization)' with '000' counter icon, showing code `view_count INT DEFAULT 0` and bullet points with a bar chart showing growth from 0. Bottom-Left 'BOOLEANS (Flags & States)' with toggle switch icon, showing code `is_verified BOOLEAN DEFAULT FALSE` and bullet points with toggle visuals (off/on). Bottom-Right 'STATUS FLAGS (Workflow Initiation)' with flow icon, showing code `status VARCHAR(20) DEFAULT 'pending'` and bullet points with a process flow visual 'Start -> Pending -> Processed'. \n\nBottom Banner: 'Strategic Value: By shifting default value generation to the database engine, clients are relieved of redundant logic, ensuring system-wide consistency and reducing the risk of human error in application code.'. All code snippets are in monospace font.",
    "style_tokens": ["technical infographic", "split-screen layout", "process diagram", "dark mode UI", "code snippets visualization"],
    "color_palette": ["dark blue/grey background", "cyan highlights", "white text", "monospace code green/orange"],
    "layout_type": "Split screen: Left vertical flow, Right 2x2 grid"
  }
},
 {
  "filename": "image_5.png",
  "prompt_data": {
    "master_prompt": "Infographic titled 'DEFAULT & NOT NULL: Convenience + Safety Combined' in large white text at top. Dark blue digital background with circuit lines and binary code. \n\nTop Section: Two header points connected to a center. Left point: Icon of hand dropping coin into table, title 'Convenience: Skip on INSERT'. Text: 'Callers can omit the column during INSERT operations. No application logic needed for initial values.'. Cyan arrow points right. Right point: Icon of shield over database cylinder, title 'Safety: Never NULL'. Text: 'The column must always have a value. Data integrity is guaranteed.'. Cyan arrow points left. Both arrows converge on a central glowing 'Combined Benefit' element with interlocked gears and an arrow pointing to a database table with a large padlock icon over it. \n\nBottom Section: Three dark panels with glowing borders showing code examples. \n\nLeft Panel 'Example 1: Boolean Flag': Code `published BOOLEAN NOT NULL DEFAULT FALSE`. Below it, a visual showing SQL `INSERT INTO articles(title) VALUES ('New Post');` leading to a table visualization showing 'title: New Post' and 'published: FALSE' (highlighted). \n\nRight Top Panel 'Example 2: Numeric Counter': Code `view_count INT DEFAULT 0`. \n\nRight Bottom Panel 'Example 3: Status Field': Code `status VARCHAR(20) DEFAULT 'draft'`. \n\nAll code is in monospace font with syntax highlighting (orange/blue keywords). The overall aesthetic is clean, glowing, high-tech visualization.",
    "style_tokens": ["cybersecurity aesthetic", "database diagram", "dark mode", "neon blue glow", "code examples"],
    "color_palette": ["deep blue background", "electric cyan glow", "orange code highlights"],
    "layout_type": "Top conceptual flow leading to bottom practical examples grid"
  }
},
  {
  "filename": "image_6.png",
  "prompt_data": {
    "master_prompt": "Technical infographic titled 'SQL Constraint Validation & Automated Testing Strategy' with subtitle 'Ensuring Data Integrity Before Production through Repeatable Test Harnesses.'. Dark tech background with circuit patterns. \n\nThe layout is divided into three vertical columns by faint lines. \n\nColumn 1 (Left, titled 'The Necessity of Validation'): Three bullet points with icons. Icon 1 (Shield with check): 'Constraints must be validated before production data arrives.'. Icon 2 (Database with lock): 'Prevents invalid data from compromising system integrity.'. Icon 3 (User with red X over head): 'Manual verification is error-prone and unscalable.'. \n\nColumn 2 (Middle, titled 'Repeatable Test Harness Workflow'): A 4-step vertical flowchart connected by downward arrows. Step 1 (Gears icon): '1. Setup' 'Creates throw-away tables & schemas.'. Step 2 (SQL document icon): '2. Execute & Assert' 'Attempts illegal operations & asserts expected error messages.'. Step 3 (Clipboard checklist icon): '3. Verify & Log' 'Confirms constraints are enforced & logs results.'. Step 4 (Trash can icon): '4. Cleanup' 'Cleans up its objects, leaving the database pristine.'. \n\nColumn 3 (Right, titled 'Automated CI/CD Integration'): A horizontal pipeline flowchart. 'Code Commit' (git icon) -> 'CI Pipeline Trigger' (rocket icon) -> 'Run Constraint Tests' (terminal icon) -> Split path decision diamond 'Tests Pass?'. 'Yes' path (green arrow) -> 'Deploy to Stage/Prod' (server icon). 'No' path (red arrow) -> 'Alert & Block Deployment' (red siren icon). A grey box below the pipeline reads 'Prevents regression when constraints are added, dropped, or altered.'. \n\nBottom Text: 'Automating these scenarios in CI pipelines ensures continuous data integrity and rapid feedback loops for database changes.'.",
    "style_tokens": ["DevOps infographic", "CI/CD pipeline visualization", "dark mode", "flowchart icons", "clean technical layout"],
    "color_palette": ["dark charcoal background", "cyan headers", "green success paths", "red failure paths"],
    "layout_type": "Three distinct vertical columns with internal flows"
  }
},
{
  "filename": "image_7.png",
  "prompt_data": {
    "master_prompt": "Infographic titled 'SQL Constraints: The Declarative Safety Net.' with subtitle 'Enforcing Data Integrity at the Engine Level.'. Dark blue geometric background with subtle light trails. \n\nThe main body is a 2x3 grid of six rectangular, glowing, dark blue information cards with metallic borders. \n\nTop-Left Card 'PRIMARY KEY': Gold key icon. Text 'Guarantees uniqueness and non-null identity for every row.'. Visual: A small table labeled 'PK' with rows 1, 2, 3, 4 numbered. \n\nTop-Middle Card 'FOREIGN KEY': Gears icon. Text 'Enforces that relationships between tables remain valid.'. Visual: 'Parent Table (PK)' connected by a line to 'Child Table (FX)'. \n\nTop-Right Card 'UNIQUE': Diamond icon. Text 'Prevents duplicate values in a column or column set.'. Visual: A column with four checkmarks indicating unique values. \n\nBottom-Left Card 'NOT NULL': Shield with check icon. Text 'Blocks missing values.'. Visual: A table column with an arrow pointing to an empty cell with a large 'X' inside it, labeled 'NOT NULL'. \n\nBottom-Middle Card 'CHECK': Clipboard with magnifying glass icon. Text 'Validates that data satisfies Boolean conditions.'. Visual: Code snippet `age >= 18` with a green arrow 'PASS' and red arrow 'FAIL'. \n\nBottom-Right Card 'DEFAULT': Arrow pointing to browser window icon. Text 'Supplies an automatic value when none is provided.'. Visual: An input form with 'Status' field automatically filled with 'pending'. \n\nBottom Banner Text: 'Together, these constraints form a robust, declarative safety net that operates directly within the database engine, ensuring consistency and reliability without application code.'.",
    "style_tokens": ["grid layout", "feature cards", "dark mode UI", "database concepts", "clean icons"],
    "color_palette": ["dark blue card backgrounds", "gold/cyan/white icon accents", "white text"],
    "layout_type": "2x3 Grid of modular cards"
  }
},
 {
  "filename": "image_8.png",
  "prompt_data": {
    "master_prompt": "Infographic titled 'Constraints: Your Data's First Line of Defense.' in large white serif font. Subtitle: 'Mastery distinguishes professional database designs from fragile prototypes.'. The background is a dark digital landscape with glowing data blocks and lines. \n\nCenter Element: A large glowing isometric shield icon with a checkmark, labeled 'DATABASE ENGINE'. Data streams (green/red lines) are flowing into it from the surrounding cards, with bad data being blocked by red barriers. \n\nSurrounding the center are six glowing modular cards with rounded corners, arranged in two rows of three, framing the center. \n\nTop-Left Card 'PRIMARY KEY (PK)': Lock icon. Text 'Uniquely identifies each row. Cannot be NULL.'. Code: `customer_id SERIAL PRIMARY KEY`. \n\nTop-Right Card 'FOREIGN KEY (FK)': Chain link icon. Text 'Enforces relationships between tables. Ensures validity.'. Code: `FOREIGN KEY (customer_id) REFERENCES customers(id)`. \n\nMiddle-Left Card 'UNIQUE': Fingerprint icon. Text 'Ensures all values in a column are different.'. Code: `email VARCHAR(255) UNIQUE`. \n\nMiddle-Right Card 'CHECK': Checkbox icon. Text 'Validates values against a specific condition.'. Code: `age INT CHECK (age >= 18)`. \n\nBottom-Left Card 'NOT NULL': Circle-backslash icon. Text 'Prevents NULL values. Requires data.'. Code: `full_name VARCHAR(100) NOT NULL`. \n\nBottom-Right Card 'DEFAULT': Clock/history icon. Text 'Automatically inserts a value if omitted.'. Code: `status VARCHAR(20) DEFAULT 'active'`. \n\nBottom Section: A wide text banner 'Properly configured, they reject bad data at the earliest moment, eliminating entire classes of application bugs and costly clean-up scripts.'. To its right, a purple quote bubble element: 'Master these concepts for robust, self-protecting databases.'. All code is monospace cyan font.",
    "style_tokens": ["cybersecurity visualization", "central hub architecture", "dark mode cards", "database schema design", "neon glow"],
    "color_palette": ["deep purple/blue background", "cyan and purple neon accents", "green valid data flow", "red invalid data block"],
    "layout_type": "Central hub surrounded by a 2x3 grid of satellite cards"
  }
},
  {
  "filename": "cpu_cooler_infographic.png",
  "prompt_data": {
    "master_prompt": "A detailed technical infographic on a textured beige background titled 'HIGH-PERFORMANCE CPU COOLING: HEAT PIPE & FIN STACK DYNAMICS'. Subtitle: 'Efficient Thermal Dissipation via Phase-Change Technology.'. The main visual is an exploded isometric view of a large tower-style CPU air cooler. At the bottom is the motherboard socket with a CPU labeled 'PROCESSOR (Heat Source)'. Above it, the cooler base is labeled 'NICKEL-PLATED COPPER BASE (Direct Contact)'. Six copper tubes rise from the base, labeled 'HEAT PIPES (Vapor Chamber Principle)'. These pass through a dense stack of aluminum plates labeled 'ALUMINUM FIN STACK (Extended Surface Area)'. A large fan is pulled away from the front, labeled 'PWM FAN (High Static Pressure Airflow)'. Blue arrows show 'COOL AIR INTAKE' and red/orange arrows show 'HOT AIR EXHAUST' exiting the rear of the fin stack. \n\nOn the right side, a vertical panel titled 'HEAT PIPE OPERATION CYCLE' shows a cross-section diagram of a single tube. Bottom: '1. EVAPORATION (Fluid turns to vapor at hot interface)'. Middle (Upward arrow): '2. VAPOR TRANSPORT (Moves to cool end)'. Top: '3. CONDENSATION (Vapor cools to liquid, releasing heat to fins)'. Sides (Downward arrows along wick): '4. CAPILLARY RETURN (Liquid flows back to heat source)'. The style is clean technical product breakdown with thermal color coding (blue cool, red hot) on the beige background.",
    "style_tokens": ["product hardware infographic", "exploded view", "textured beige background", "thermal flow visualization", "process cycle diagram"],
    "color_palette": ["beige background hex#F5F5DC", "copper orange hex#B87333", "aluminum silver hex#C0C0C0", "cool blue airflow hex#0099FF", "hot red airflow hex#FF3300"],
    "layout_type": "Exploded product view with side-panel process diagram"
  }
},
{
  "image_filename": "image_45a343.jpg",
  "prompt_data": {
    "title": "Section B — FOREIGN KEY Relationships",
    "visual_style": "Dark-mode technical UI, deep blue background with glowing cyan and neon accents, glassmorphism panels.",
    "layout": "Three distinct vertical panels connected by a thick glowing cyan horizontal flow-arrow.",
    "panel_1_content": "Title: 'Definition'. Text: 'A FOREIGN KEY in the child table points to the PRIMARY KEY of the parent table...'. Visual: Two database table diagrams labeled 'PARENT TABLE' (with crown icon) and 'CHILD TABLE' (with key icon) linked by a web of blue lines.",
    "panel_2_content": "Title: 'Database Engine’s Role'. Visual: A large glowing blue shield-gear icon. Text: 'Maintains this invariant on every insert...'. Below: Small isometric diagram showing a link breaking against a red brick wall labeled 'orphaned record'.",
    "panel_3_content": "Title: 'Performance & Indexing'. Visual: A glowing speedometer icon. Text: 'Defining the constraint also creates an index...'. Below: A visual of two smaller tables merging into one larger table with a magnifying glass labeled 'INDEX'.",
    "typography": "Clean white sans-serif for body text; large Serif font for the main section title."
  }
},
{
  "image_filename": "image_45a682.jpg",
  "prompt_data": {
    "title": "Referential Integrity & Data Lifecycle",
    "visual_style": "Cyberpunk isometric design, dark navy background with circuit-trace patterns.",
    "layout": "Linear process flow from left to right using isometric cubes to represent data nodes.",
    "steps": [
      "Step 1: 'Parent Existence' showing a grey cube with 'P' and a green checkmark.",
      "Step 2: 'Child Insertion (Dependency)' showing two cubes ('C' and 'P') connected by a link.",
      "Step 3: Branching path for 'Parent Deletion'. Top branch: 'CASCADE (Automatic Deletion)' with red X. Bottom branch: 'RESTRICT / SET NULL' with a blue shield icon."
    ],
    "sidebar_panel": "Dark box on the right titled 'Codified Business Policy' with a gear icon and text about ON DELETE actions.",
    "footer": "Horizontal bar at the bottom titled 'Atomic Enforcement' with a padlock icon.",
    "colors": ["Neon Cyan #00F2FF", "Emerald Green #00FF88", "Alert Red #FF3D3D", "Deep Navy #0A0E1A"]
  }
},
 {
  "image_filename": "image_45a60c.jpg",
  "prompt_data": {
    "title": "Section D — DEFAULT Values & Automated Consistency",
    "visual_style": "Clean enterprise software dashboard aesthetic, dark grey background, high-contrast text.",
    "layout": "Split screen. Left side: Vertical process flow. Right side: 2x2 grid of use-case cards.",
    "left_side_flow": "CLIENT APPLICATION -> DATABASE ENGINE (gear icon) -> TABLE ROW. Visualizes an INSERT statement resulting in a 'pending' status being injected into a table.",
    "right_side_grid": [
      "Card 1: TIMESTAMPS with clock icon and line graph.",
      "Card 2: COUNTERS with '000' icon and bar chart.",
      "Card 3: BOOLEANS with toggle switch icon.",
      "Card 4: STATUS FLAGS with workflow node icon."
    ],
    "code_styling": "Monospace font for SQL snippets like 'status DEFAULT 'pending'' and 'view_count INT DEFAULT 0'."
  }
},
 {
  "image_filename": "image_45a647.jpg",
  "prompt_data": {
    "title": "DEFAULT & NOT NULL: Convenience + Safety Combined",
    "visual_style": "High-glow marketing tech infographic, dark blue gradients with binary code background patterns.",
    "top_visual": "Two headers: 'Convenience: Skip on INSERT' (hand icon) and 'Safety: Never NULL' (shield icon) pointing to a central 'Combined Benefit' gear icon and a locked database table.",
    "bottom_grid": [
      "Example 1: Boolean Flag with code box 'published BOOLEAN NOT NULL DEFAULT FALSE'.",
      "Example 2: Numeric Counter with code 'view_count INT DEFAULT 0'.",
      "Example 3: Status Field with code 'status VARCHAR(20) DEFAULT 'draft''."
    ],
    "lighting": "Strong cyan bloom/glow effects around the central 'Combined Benefit' circle."
  }
},
 {
  "image_filename": "image_45a6a8.jpg",
  "prompt_data": {
    "title": "SQL Constraint Validation & Automated Testing Strategy",
    "visual_style": "DevOps pipeline visualization, dark grey background with isometric server rack textures.",
    "columns": [
      "Col 1: 'The Necessity of Validation' with bullet points and security icons.",
      "Col 2: 'Repeatable Test Harness Workflow' showing a 4-step vertical list: Setup, Execute, Verify, Cleanup.",
      "Col 3: 'Automated CI/CD Integration' showing a horizontal pipeline: Commit -> Trigger -> Test -> Pass/Fail Decision Diamond -> Deploy/Block."
    ],
    "decision_logic": "Flowchart logic showing a green 'Yes' path to deployment and a red 'No' path to a siren icon labeled 'Alert & Block Deployment'."
  }
},
 {
  "image_filename": "image_45a301.jpg",
  "prompt_data": {
    "title": "SQL Constraints: The Declarative Safety Net.",
    "subtitle": "Enforcing Data Integrity at the Engine Level.",
    "visual_style": "Card-based UI design, dark blue-grey panels with subtle inner-glow borders.",
    "layout": "2x3 grid of six information cards.",
    "cards": [
      "PRIMARY KEY: Gold key icon, table visual.",
      "FOREIGN KEY: Gear icon, linked tables visual.",
      "UNIQUE: Diamond icon, checkmark column visual.",
      "NOT NULL: Shield icon, table with an X visual.",
      "CHECK: Checklist icon, 'age >= 18' logic visual.",
      "DEFAULT: Arrow icon, input field visual."
    ],
    "footer": "Full-width text block summarizing constraints as a 'declarative safety net'."
  }
},
 {
  "image_filename": "image_45a6e5.jpg",
  "prompt_data": {
    "title": "Constraints: Your Data's First Line of Defense.",
    "visual_style": "Hero-style technical graphic with a central focal point.",
    "center_visual": "A glowing isometric monitor showing a shield icon labeled 'DATABASE ENGINE', with data packets flying toward it.",
    "layout": "Six cards surrounding the central engine icon in a 2x3 layout.",
    "card_content": "Each card contains a title (PK, FK, UNIQUE, CHECK, NOT NULL, DEFAULT), a short description, and a dark code-block snippet (e.g., 'email VARCHAR(255) UNIQUE').",
    "call_to_action": "Bottom right purple speech bubble: 'Master these concepts for robust, self-protecting databases.'",
    "font": "Serif font for the main header; Monospace cyan font for the code blocks."
  }
}
];
