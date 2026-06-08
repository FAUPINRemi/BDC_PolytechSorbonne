-- pgcrypto for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Recipes
CREATE TABLE IF NOT EXISTS recipes (
  id           SERIAL PRIMARY KEY,
  slug         TEXT NOT NULL UNIQUE,
  title        TEXT NOT NULL,
  description  TEXT NOT NULL DEFAULT '',
  tags         TEXT[] NOT NULL DEFAULT '{}',
  prep_minutes INT NOT NULL DEFAULT 0,
  cook_minutes INT NOT NULL DEFAULT 0,
  image_url    TEXT,
  ingredients  TEXT[] NOT NULL DEFAULT '{}',
  steps        TEXT[] NOT NULL DEFAULT '{}',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Admin users
CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  username      TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Default admin (password: admin123 — change in production!)
INSERT INTO users (username, password_hash)
VALUES ('admin', crypt('admin123', gen_salt('bf', 12)))
ON CONFLICT (username) DO NOTHING;

-- Recipes
INSERT INTO recipes (slug, title, description, tags, prep_minutes, cook_minutes, image_url, ingredients, steps)
VALUES
(
  'carottes-roties-miel',
  'Carottes rôties au miel',
  'Une recette simple, rapide, et parfaite pour accompagner un plat. Le miel caramélise au four et donne aux carottes une belle couleur dorée.',
  ARRAY['Facile', 'Végétarien', 'Accompagnement'],
  10, 25,
  'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=1200&q=80',
  ARRAY[
    '500 g de carottes',
    '2 c. à soupe de miel',
    '2 c. à soupe d''huile d''olive',
    '1 c. à café de thym séché',
    'Sel et poivre noir du moulin',
    '1 gousse d''ail (optionnel)'
  ],
  ARRAY[
    'Préchauffer le four à 200 °C (chaleur tournante).',
    'Éplucher les carottes et les couper en bâtonnets de taille régulière (environ 1 cm d''épaisseur).',
    'Dans un grand bol, mélanger l''huile d''olive, le miel, le thym, le sel et le poivre.',
    'Ajouter les carottes et bien enrober du mélange.',
    'Étaler en une seule couche sur une plaque de four recouverte de papier sulfurisé.',
    'Enfourner 25 minutes, en retournant les carottes à mi-cuisson pour une cuisson uniforme.',
    'Servir immédiatement, idéalement avec de la fleur de sel.'
  ]
),
(
  'crepes-moelleuses',
  'Crêpes moelleuses',
  'Base parfaite pour sucré ou salé, avec une texture légère et aérée. La recette familiale indémodable du dimanche matin.',
  ARRAY['Dessert', 'Classique', 'Petit-déjeuner'],
  10, 20,
  'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=1200&q=80',
  ARRAY[
    '250 g de farine',
    '3 œufs',
    '500 ml de lait entier',
    '1 c. à soupe de sucre',
    '30 g de beurre fondu',
    '1 pincée de sel',
    '1 c. à café d''extrait de vanille (optionnel)',
    'Beurre pour la cuisson'
  ],
  ARRAY[
    'Mélanger la farine, le sucre et le sel dans un grand saladier.',
    'Creuser un puits au centre et y casser les 3 œufs battus.',
    'Incorporer le lait progressivement en fouettant énergiquement pour éviter les grumeaux.',
    'Ajouter le beurre fondu (et la vanille si souhaité) puis mélanger.',
    'Laisser reposer la pâte au moins 30 minutes à température ambiante.',
    'Chauffer une poêle antiadhésive et la beurrer légèrement.',
    'Verser une louche de pâte et incliner la poêle pour étaler uniformément.',
    'Cuire 1 à 2 minutes jusqu''à ce que les bords se décollent, puis retourner et cuire 30 secondes.',
    'Répéter jusqu''à épuisement de la pâte. Servir avec confiture, Nutella ou sucre citron.'
  ]
),
(
  'pasta-carbonara',
  'Pasta carbonara',
  'La vraie carbonara romaine : sans crème, juste des œufs, du pecorino et des lardons. Un classique de la cuisine italienne en moins de 30 minutes.',
  ARRAY['Italien', 'Rapide', 'Pâtes'],
  10, 15,
  'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=1200&q=80',
  ARRAY[
    '400 g de spaghettis',
    '150 g de guanciale (ou lardons fumés)',
    '4 jaunes d''œufs',
    '1 œuf entier',
    '80 g de pecorino romano râpé',
    '30 g de parmesan râpé',
    'Poivre noir fraîchement moulu',
    'Sel'
  ],
  ARRAY[
    'Porter à ébullition une grande casserole d''eau salée et cuire les spaghettis al dente selon les indications du paquet.',
    'Pendant ce temps, couper le guanciale en petits lardons et le faire revenir à feu moyen dans une grande poêle sans matière grasse, jusqu''à ce qu''il soit croustillant.',
    'Dans un bol, battre les jaunes d''œufs avec l''œuf entier, le pecorino, le parmesan et une généreuse quantité de poivre noir.',
    'Réserver 1 à 2 verres d''eau de cuisson des pâtes avant d''égoutter.',
    'Retirer la poêle du feu. Ajouter les pâtes égouttées dans la poêle avec le guanciale.',
    'Verser le mélange œufs-fromage et mélanger rapidement en ajoutant l''eau de cuisson petit à petit jusqu''à obtenir une sauce crémeuse.',
    'Servir immédiatement avec un supplément de pecorino et de poivre noir.'
  ]
),
(
  'tarte-aux-pommes',
  'Tarte aux pommes maison',
  'Une tarte aux pommes classique avec une pâte sablée croustillante et une garniture fondante. Le dessert réconfortant par excellence.',
  ARRAY['Dessert', 'Classique', 'Boulangerie'],
  30, 35,
  'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=1200&q=80',
  ARRAY[
    '200 g de farine',
    '100 g de beurre froid en dés',
    '50 g de sucre glace',
    '1 œuf',
    '1 pincée de sel',
    '4 pommes (type Golden ou Granny Smith)',
    '2 c. à soupe de sucre roux',
    '1 c. à café de cannelle',
    '30 g de beurre pour les pommes',
    '2 c. à soupe de confiture d''abricot (nappage)'
  ],
  ARRAY[
    'Préparer la pâte : sabler la farine avec le beurre froid du bout des doigts jusqu''à obtenir une texture sableuse.',
    'Ajouter le sucre glace, l''œuf et le sel. Mélanger sans trop travailler la pâte. Former une boule, filmer et réfrigérer 30 minutes.',
    'Préchauffer le four à 180 °C. Étaler la pâte sur un plan fariné et foncer un moule à tarte de 28 cm.',
    'Piquer le fond avec une fourchette et faire cuire à blanc 10 minutes (avec des billes de cuisson).',
    'Éplucher, évider et couper les pommes en fines lamelles.',
    'Faire revenir les pommes dans le beurre avec le sucre roux et la cannelle pendant 5 minutes.',
    'Disposer les lamelles de pommes en rosace sur le fond de tarte précuit.',
    'Enfourner 25 à 30 minutes jusqu''à ce que les pommes soient dorées.',
    'Chauffer légèrement la confiture d''abricot et badigeonner les pommes pour faire briller. Laisser tiédir avant de servir.'
  ]
),
(
  'poulet-curry-coco',
  'Poulet au curry et lait de coco',
  'Un curry thaï doux et parfumé, crémeux grâce au lait de coco. Prêt en 30 minutes, il régale aussi bien les amateurs de cuisine épicée que les néophytes.',
  ARRAY['Asiatique', 'Épicé', 'Facile'],
  15, 25,
  'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1200&q=80',
  ARRAY[
    '600 g de filets de poulet',
    '400 ml de lait de coco',
    '2 c. à soupe de pâte de curry rouge (ou jaune)',
    '1 oignon',
    '3 gousses d''ail',
    '1 c. à café de gingembre frais râpé',
    '2 c. à soupe d''huile de coco (ou végétale)',
    '1 c. à soupe de sauce soja',
    '1 c. à café de sucre de coco (ou cassonade)',
    'Basilic thaï ou coriandre fraîche',
    'Riz basmati pour servir'
  ],
  ARRAY[
    'Couper le poulet en morceaux de 3 cm. Émincer l''oignon et hacher l''ail finement.',
    'Faire chauffer l''huile dans un wok ou une grande sauteuse à feu vif.',
    'Faire revenir l''oignon 3 minutes jusqu''à ce qu''il soit translucide.',
    'Ajouter l''ail, le gingembre et la pâte de curry. Faire sauter 1 minute pour libérer les arômes.',
    'Ajouter les morceaux de poulet et faire dorer 4 à 5 minutes en remuant régulièrement.',
    'Verser le lait de coco, la sauce soja et le sucre. Mélanger et porter à légère ébullition.',
    'Baisser le feu et laisser mijoter 15 minutes jusqu''à ce que le poulet soit cuit et la sauce épaissie.',
    'Rectifier l''assaisonnement. Parsemer de basilic thaï ou de coriandre.',
    'Servir sur du riz basmati cuit à la vapeur.'
  ]
),
(
  'soupe-courge-butternut',
  'Soupe de courge butternut',
  'Veloutée, douce et réconfortante — cette soupe de butternut rôtie est parfaite pour les soirées d''automne. Le rôtissage au four intensifie les saveurs.',
  ARRAY['Végétarien', 'Automne', 'Soupe'],
  15, 40,
  'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=1200&q=80',
  ARRAY[
    '1 courge butternut (environ 1 kg)',
    '1 oignon',
    '2 gousses d''ail',
    '2 c. à soupe d''huile d''olive',
    '700 ml de bouillon de légumes',
    '150 ml de crème fraîche (ou lait de coco pour version vegan)',
    '1 c. à café de cumin',
    '1 c. à café de paprika fumé',
    'Sel, poivre',
    'Graines de courge et huile de courge pour garnir'
  ],
  ARRAY[
    'Préchauffer le four à 200 °C. Couper la butternut en deux, badigeonner d''huile, saler et poivrer.',
    'Poser les demi-courges face coupée vers le bas sur une plaque et enfourner 35 à 40 minutes jusqu''à ce que la chair soit tendre.',
    'Pendant ce temps, faire revenir l''oignon émincé dans une casserole avec un filet d''huile pendant 5 minutes.',
    'Ajouter l''ail, le cumin et le paprika, cuire 1 minute supplémentaire.',
    'Récupérer la chair de la butternut à la cuillère et l''ajouter dans la casserole.',
    'Verser le bouillon de légumes, porter à ébullition et laisser mijoter 5 minutes.',
    'Mixer finement avec un mixeur plongeant jusqu''à obtenir un velouté lisse.',
    'Incorporer la crème fraîche, rectifier l''assaisonnement et réchauffer doucement.',
    'Servir dans des bols avec un filet de crème, des graines de courge et un trait d''huile de courge.'
  ]
),
(
  'guacamole-maison',
  'Guacamole maison',
  'Le vrai guacamole mexicain, frais et parfumé. Incontournable pour les apéros, avec des chips de tortilla ou en accompagnement de tacos.',
  ARRAY['Végétarien', 'Apéro', 'Mexicain', 'Rapide'],
  15, 0,
  'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=1200&q=80',
  ARRAY[
    '3 avocats bien mûrs',
    '1 citron vert (jus)',
    '1 tomate',
    '1/2 oignon rouge',
    '1 gousse d''ail',
    '1/2 piment jalapeño (optionnel)',
    '1 bouquet de coriandre fraîche',
    'Sel, poivre',
    'Chips de tortilla pour servir'
  ],
  ARRAY[
    'Couper les avocats en deux, retirer le noyau et récupérer la chair dans un bol.',
    'Écraser grossièrement la chair d''avocat à la fourchette — garder une texture légèrement grumeleuse.',
    'Arroser immédiatement du jus de citron vert pour éviter l''oxydation.',
    'Épépiner et couper la tomate en petits dés. Émincer finement l''oignon rouge et l''ail.',
    'Hacher le piment jalapeño (sans les graines pour moins de piquant) et la coriandre fraîche.',
    'Incorporer tous les ingrédients dans le bol d''avocat. Mélanger délicatement.',
    'Assaisonner avec sel et poivre. Goûter et ajuster le citron ou le piment selon vos préférences.',
    'Servir immédiatement avec des chips de tortilla ou réfrigérer 30 min pour que les saveurs se mélangent.'
  ]
),
(
  'risotto-champignons',
  'Risotto aux champignons',
  'Un risotto crémeux aux champignons de Paris et shiitake, parfumé au parmesan et au vin blanc. La recette italienne qui impressionne à tous les coups.',
  ARRAY['Italien', 'Végétarien', 'Plat principal'],
  20, 30,
  'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=1200&q=80',
  ARRAY[
    '320 g de riz à risotto (Arborio ou Carnaroli)',
    '300 g de champignons de Paris',
    '100 g de shiitake (ou champignons séchés réhydratés)',
    '1 oignon',
    '2 gousses d''ail',
    '150 ml de vin blanc sec',
    '1 litre de bouillon de légumes chaud',
    '60 g de parmesan râpé',
    '40 g de beurre',
    '3 c. à soupe d''huile d''olive',
    'Persil plat haché',
    'Sel, poivre'
  ],
  ARRAY[
    'Chauffer le bouillon de légumes dans une casserole et le maintenir à frémissement.',
    'Émincer l''oignon et l''ail. Nettoyer et trancher les champignons.',
    'Dans une grande poêle, faire revenir les champignons dans 1 c. à soupe d''huile à feu vif jusqu''à évaporation. Saler et réserver.',
    'Dans la même poêle, faire fondre l''oignon et l''ail dans le reste d''huile à feu moyen pendant 3 minutes.',
    'Ajouter le riz et faire nacrer 2 minutes en remuant (les grains doivent devenir translucides sur les bords).',
    'Verser le vin blanc et remuer jusqu''à absorption complète.',
    'Ajouter le bouillon chaud, une louche à la fois, en remuant constamment et en attendant que chaque louche soit absorbée avant d''en ajouter une nouvelle.',
    'Après 18 à 20 minutes, le riz doit être al dente. Incorporer les champignons réservés.',
    'Hors du feu, incorporer le beurre et le parmesan (mantecare). Poivrer généreusement.',
    'Laisser reposer 2 minutes, parsemer de persil et servir dans des assiettes chaudes.'
  ]
)
ON CONFLICT (slug) DO NOTHING;
