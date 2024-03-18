# Vefforritun 2 2024, hópverkefni 1

[Mikael Matthíasson](https://github.com/mikkimatt) - mim23@hi.is     
[Mikael Máni Sveinsson](https://github.com/mikaelmanis) - mms27@hi.is     
[Tómas Blær Guðmundsson](https://github.com/tomasblaer) - tbg16@hi.is   
[Þorsteinn Már Hafsteinsson](https://github.com/Thorsteinnmh) - tmh5@hi.is



## Lagerstöðu vefþjónusta.
Markmiðið með þessu verkefni var að útbúa vefþjónustu sem heldur utan um lagerstöðu fyrirtækis og sölu á vörum. Þú átt að geta stofnað notanda á fyrirtæki sem getur síðan stofnað vöru týpu og stofnað vörur undir týpunni.

## Hýsing
[Lén](hop1-production.up.railway.app)

## Hvernig setja á upp verkefnið.
Gera eftirfarandi:
- keyra npm install
- búa til .env skrá út frá .env.example
- keyra npx prisma db push

## Innskráning:
Til að innskrá sig verður að búa til company á eftirfarandi hátt:

post request {{url}}/company
með json gögn sem inniheldur bara "name"
t.d. 
{
    "name": "Fyrirtækjanafn"
}

næst post request {{url}}/login
með json gögnum sem innihalda áður skráða username og password
t.d.
{
    "username": "{notandanafnið sem var myndað eftir að fyrirtækið var stofnað}"
    "password": "{lykilorðið sem var myndað eftir að fyrirtækið var stofnað}"
}

Þá fær viðkomandi JWT_token sem verður að setja í headers þar sem 

KEY = Authorization
VALUE = Bearer {JWT_token sem fékkst við innskráningu}

## Dæmi um test köll í vefþjón:

Búa til vöru týpu

POST - {{url}}/itemType

{
    "name": "Snickers"
    "price": 400
}

bæta inn vöru á týpuna

POST - {{url}}/items/:itemTypeId

{
    "comment": "Þú ert ekki þú sjálfur nema þegar þú borðar Snickers"
    "location": "Vöruhús 1"
}






