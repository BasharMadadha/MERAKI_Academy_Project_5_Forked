-- Users Table
CREATE TABLE users (
    id serial PRIMARY KEY,
    username varchar,
    password varchar, 
    email varchar,
    image varchar, 
    role_id integer REFERENCES roles(id),
    crypto_amount numeric DEFAULT 2000,
    created_at timestamp
);

-- Conversations Table
CREATE TABLE conversations (
    conversation_id serial PRIMARY KEY,
    conversation_name varchar,
    created_at timestamp
);

-- Participants Table
CREATE TABLE participants (
    participant_id serial PRIMARY KEY,
    user_id integer REFERENCES users(id),
    conversation_id integer REFERENCES conversations(conversation_id)
);

-- Messages Table
CREATE TABLE messages (
    message_id serial PRIMARY KEY,
    conversation_id integer REFERENCES conversations(conversation_id),
    user_id integer REFERENCES users(id),
    content text,
    timestamp timestamp
);

-- Attachments Table
CREATE TABLE attachments (
    attachment_id serial PRIMARY KEY,
    message_id integer REFERENCES messages(message_id),
    file_url varchar,
    file_type varchar,
    created_at timestamp
);

-- User Contacts Table
CREATE TABLE user_contacts (
    contact_id serial PRIMARY KEY,
    user_id integer REFERENCES users(id),
    contact_user_id integer REFERENCES users(id),
    created_at timestamp
);

-- Group Info Table
CREATE TABLE group_info (
    group_id serial PRIMARY KEY,
    group_name varchar,
    created_by integer REFERENCES users(id),
    created_at timestamp
);

-- Group Members Table
CREATE TABLE group_members (
    group_member_id serial PRIMARY KEY,
    group_id integer REFERENCES group_info(group_id),
    user_id integer REFERENCES users(id)
);

-- Read Status Table
CREATE TABLE read_status (
    read_status_id serial PRIMARY KEY,
    message_id integer REFERENCES messages(message_id),
    user_id integer REFERENCES users(id),
    is_read boolean,
    read_timestamp timestamp
);

-- Typing Status Table
CREATE TABLE typing_status (
    typing_status_id serial PRIMARY KEY,
    user_id integer REFERENCES users(id),
    conversation_id integer REFERENCES conversations(conversation_id),
    is_typing boolean,
    timestamp timestamp
);

CREATE TABLE notifications (
    id serial PRIMARY KEY,
    user_id integer REFERENCES users(id),
    target_id integer, -- Reference to either a 'likes' or 'comments' table entry
    target_type varchar, -- Indicates whether it's a 'like' or a 'comment'
    message text,
    timestamp timestamp,
    is_read boolean DEFAULT false
);

CREATE TABLE friend_list (
    id serial PRIMARY KEY,
    user_id integer REFERENCES users(id),
    friend_user_id integer REFERENCES users(id),
    status varchar, 
    created_at timestamp
);
CREATE TABLE deck (
    id serial PRIMARY KEY,
    user_id integer REFERENCES users(id),
    deck_name varchar,
    cards jsonb, 
    created_at timestamp
);
CREATE TABLE score (
    id serial PRIMARY KEY,
    user_id integer REFERENCES users(id),
    wins integer DEFAULT 0,
    losses integer DEFAULT 0,
    created_at timestamp
);
CREATE TABLE comments (
    comment_id serial PRIMARY KEY,
    user_id integer REFERENCES users(id),
    post_id integer REFERENCES posts(post_id),
    content text,
    created_at timestamp
);
CREATE TABLE likes (
    like_id serial PRIMARY KEY,
    user_id integer REFERENCES users(id),
    post_id integer REFERENCES posts(post_id),
    created_at timestamp
);
CREATE TABLE posts (
    post_id serial PRIMARY KEY,
    user_id integer REFERENCES users(id),
    title varchar,
    content text,
    image_url varchar,
    created_at timestamp
);