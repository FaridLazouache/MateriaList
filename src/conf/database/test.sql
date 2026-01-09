PRAGMA foreign_keys = ON;

/* ========================= MANUFACTURER ========================= */

INSERT INTO manufacturer (id, name) VALUES
(1, 'Shinra Industries'),
(2, 'NERV'),
(3, 'Umbrella Corp'),
(4, 'Cyberdyne Systems'),
(5, 'Tyrell Corporation'),
(6, 'Weyland-Yutani'),
(7, 'Stark Industries'),
(8, 'Black Mesa'),
(9, 'Aperture Science'),
(10, 'Vault-Tec');

/* ========================= PICTURES ========================= */

INSERT INTO pictures (id, title, path, main) VALUES
(1, 'Buster Sword', '/images/buster_sword_main.png', 1),
(2, 'Materia Orb', '/images/materia_orb.png', 0),
(3, 'Eva Unit 01', '/images/eva01.png', 1),
(4, 'T-Virus Sample', '/images/tvirus.png', 1),
(5, 'T-800 Endoskeleton', '/images/t800.png', 1),
(6, 'Nexus Replicant', '/images/nexus.png', 1),
(7, 'Xenomorph Egg', '/images/xeno_egg.png', 1),
(8, 'Arc Reactor', '/images/arc_reactor.png', 1),
(9, 'Portal Gun', '/images/portal_gun.png', 1),
(10, 'Vault Boy', '/images/vault_boy.png', 1);

/* ========================= ITEM ========================= */

INSERT INTO item (id, name, manufacturer_id, picture_id) VALUES
(1, 'Buster Sword', 1, 1),
(2, 'Green Materia', 1, 2),
(3, 'Eva Unit 01', 2, 3),
(4, 'T-Virus', 3, 4),
(5, 'T-800', 4, 5),
(6, 'Nexus-6', 5, 6),
(7, 'Xenomorph Egg', 6, 7),
(8, 'Arc Reactor', 7, 8),
(9, 'Portal Gun', 9, 9),
(10, 'Vault Suit', 10, 10);

/* ========================= UNIVERSE ========================= */

INSERT INTO universe (id, name, color) VALUES
(1, 'Final Fantasy VII', '#00ffcc'),
(2, 'Neon Genesis Evangelion', '#8a2be2'),
(3, 'Resident Evil', '#b22222'),
(4, 'Terminator', '#ff4500'),
(5, 'Blade Runner', '#1e90ff'),
(6, 'Alien', '#228b22'),
(7, 'Marvel', '#ff0000'),
(8, 'Half-Life', '#ffa500'),
(9, 'Portal', '#00bfff'),
(10, 'Fallout', '#ffd700');

/* ========================= UNIVERSE_ITEM ========================= */

INSERT INTO universe_item (id, item_id, universe_id) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 2),
(4, 4, 3),
(5, 5, 4),
(6, 6, 5),
(7, 7, 6),
(8, 8, 7),
(9, 9, 9),
(10, 10, 10);

/* ========================= MULTI-UNIVERSE EXAMPLES ========================= */

INSERT INTO universe_item (item_id, universe_id) VALUES
(1, 7),   -- Buster Sword in Marvel (cross-over)
(8, 5),   -- Arc Reactor in Blade Runner
(9, 8),   -- Portal Gun in Half-Life
(5, 7),   -- T-800 in Marvel
(6, 10);  -- Nexus-6 in Fallout
