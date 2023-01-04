import { prisma } from "lib/prisma";

export default async function createDB() {

    try {    
        await prisma.user.createMany({
            data: [
                {
                    id: "1",
                    createdAt: "2022-11-08T03:08:45.700Z",
                    firstName: "Constanza",
                    lastName: "Guerrero",
                    email: "constanza_guerrero@test.com",
                    gender: "Femenino",
                    birthday: "05/01/1980",
                    address: "Plácido Martínez 1223",
                    phone: "0379 443-3001",
                    city: "Corrientes",
                    province: "Corrientes",
                    country: "Argentina",
                    postCode: "	3400",
                    role: "BASIC",
                    active: true,
                    photo: "https://img.freepik.com/free-photo/beautiful-female-face-perfect-clean-skin-face-white_155003-32164.jpg?w=2000"
                },
                {
                    id: "2",
                    createdAt: "2022-11-08T03:08:45.700Z",
                    firstName: "Florencio",
                    lastName: "Busquets",
                    email: "florencio_busquets@test.com",
                    gender: "Masculino",
                    birthday: "23/04/2000",
                    address: "Esmeralda 449",
                    phone: "011 4315-7222",
                    city: "Ciudad Autónoma de Buenos Aires",
                    province: "Buenos Aires",
                    country: "Argentina",
                    postCode: "C1043AAH",
                    role: "BASIC",
                    active: true,
                    photo: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=2000"
                },
                {
                    id: "3",
                    createdAt: "2022-11-08T03:08:45.700Z",
                    firstName: "Candela",
                    lastName: "Lozano",
                    email: "candela_lozano@test.com",
                    gender: "Femenino",
                    birthday: "23/04/2000",
                    address: "General Justo José de Urquiza 1971",
                    phone: "0351 473-4660",
                    city: "Córdoba",
                    province: "Córdoba",
                    country: "Argentina",
                    postCode: "X5001",
                    role: "BASIC",
                    active: true,
                    photo: "https://img.freepik.com/free-photo/worldface-american-woman-white-background_53876-146191.jpg?w=2000"
                },
                {
                    id: "4",
                    createdAt: "2022-11-08T03:08:45.700Z",
                    firstName: "Rafael",
                    lastName: "Pedrosa",
                    email: "rafael_pedrosa@test.com",
                    gender: "Masculino",
                    birthday: "30/04/1993",
                    address: "Buenos Aires 768",
                    phone: "0351 554-8047",
                    city: "Córdoba",
                    province: "Córdoba",
                    country: "Argentina",
                    postCode: "X5000",
                    role: "BASIC",
                    active: true,
                    photo: "https://img.freepik.com/premium-photo/take-good-look-this-face-youll-miss-it-later-shot-handsome-young-man-standing-against-grey-background_590464-57810.jpg?w=2000"
                },
                {
                    id: "5",
                    firstName: "Urbano",
                    lastName: "Quevedo",
                    email: "urbano_quevedo@test.com",
                    gender: "Masculino",
                    birthday: "23/04/1989",
                    address: "Primitivo de la Reta 547",
                    phone: "0261 429-1110",
                    city: "Ciudad de Mendoza",
                    province: "Mendoza",
                    country: "Argentina",
                    postCode: "M5500CJI",
                    role: "BASIC",
                    active: true,
                    photo: "https://img.freepik.com/free-photo/shallow-focus-shot-young-black-male-grey-wall_181624-52039.jpg?w=2000"
                },
                {
                    id: "6",
                    firstName: "Cristian",
                    lastName: "Villalobos",
                    email: "cristian_villalobos@test.com",
                    gender: "Masculino",
                    birthday: "23/11/1977",
                    address: "Entre Ríos 73",
                    phone: "0261 425-4242",
                    city: "Ciudad de Mendoza",
                    province: "Mendoza",
                    country: "Argentina",
                    postCode: "M5500AGC",
                    role: "BASIC",
                    active: true,
                    photo: "https://img.freepik.com/foto-gratis/chico-worldface-espanol-fondo-blanco_53876-137665.jpg?w=2000"
                },
                {
                    id: "7",
                    firstName: "Soledad",
                    lastName: "Acuña",
                    email: "soledad_acuna@test.com",
                    gender: "Femenino",
                    birthday: "23/04/2000",
                    address: "Calle 3 1307",
                    phone: "02246 42-1077",
                    city: "Santa Teresita",
                    province: "Buenos Aires",
                    country: "Argentina",
                    postCode: "B7107BEK",
                    role: "BASIC",
                    active: true,
                    photo: "https://img.freepik.com/free-photo/woman-with-confident-face-expression-dressed-hoodie-looks-directly-camera-poses-rests-after-strolling-city_273609-54736.jpg?w=2000"
                },
                {
                    id: "8",
                    firstName: "Guillermo",
                    lastName: "Godoy",
                    email: "guillermo_godoy@test.com",
                    gender: "Masculino",
                    birthday: "23/04/2000",
                    address: "La Plata 945",
                    phone: "0221 421-1321",
                    city: "La Plata",
                    province: "Buenos Aires",
                    country: "Argentina",
                    postCode: "	B1900BHB",
                    role: "BASIC",
                    active: true,
                    photo: "https://img.freepik.com/fotos-premium/apuesto-joven-empresario-camisa-anteojos_85574-6228.jpg?w=2000"
                },
                {
                    id: "9",
                    firstName: "Juan",
                    lastName: "Puerta",
                    email: "juan_puerta@test.com",
                    gender: "Masculino",
                    birthday: "23/04/2000",
                    address: "BASIC",
                    phone: "BASIC",
                    city: "BASIC",
                    province: "BASIC",
                    country: "Argentina",
                    postCode: "BASIC",
                    role: "BASIC",
                    active: true,
                    photo: "https://img.freepik.com/free-photo/portrait-shirtless-young-man-isolated-grey-studio-background-caucasian-healthy-male-model-looking-side-posing-concept-men-s-health-beauty-self-care-body-skin-care_155003-33864.jpg?w=2000"
                },
                {
                    id: "10",
                    firstName: "Jaime",
                    lastName: "Iñiguez",
                    email: "jaime_iniguez@test.com",
                    gender: "Masculino",
                    birthday: "23/04/2000",
                    address: "Laprida 342",
                    phone: "011 4248-7219",
                    city: "Lomas de Zamora",
                    province: "Buenos Aires",
                    country: "Argentina",
                    postCode: "B1832",
                    role: "BASIC",
                    active: true,
                    photo: "https://img.freepik.com/fotos-premium/vista-frontal-hombre-cara-seria_23-2148364723.jpg?w=2000"
                }
                ,
                {
                    id: "11",
                    firstName: "Indiana",
                    lastName: "Cervántez",
                    email: "indiana_cervantez@test.com",
                    gender: "Femenino",
                    birthday: "23/04/2000",
                    address: "Cr.11 No.70-48",
                    phone: "(57-1)312-8152",
                    city: "Bogotá",
                    province: "Cundinamarca",
                    country: "Colombia",
                    postCode: "110711",
                    role: "BASIC",
                    active: true,
                    photo: "https://img.freepik.com/foto-gratis/retrato-hermoso-mujer-negra-sonriente_23-2149095667.jpg?w=2000"
                }
                ,
                {
                    id: "12",
                    firstName: "Matilde",
                    lastName: "Murillo ",
                    email: "matilde_murillo @test.com",
                    gender: "Femenino",
                    birthday: "23/04/2000",
                    address: "tr. cuarenta y nueve - c59-136",
                    phone: "(57-4) 2319728",
                    city: "Medellín",
                    province: "Medellín",
                    country: "Colombia",
                    postCode: "110722",
                    role: "BASIC",
                    active: true,
                    photo: "https://img.freepik.com/foto-gratis/mujer-joven-cafe-leyendo-mensaje-texto-su-telefono-mujer-latina-sentada-mesa-cafe-laptop-usando-telefonos-inteligentes_231208-5237.jpg?w=2000"
                }
                ,
                {
                    id: "13",
                    firstName: "Humbert",
                    lastName: "Ávila",
                    email: "humbert_avila@test.com",
                    gender: "Masculino",
                    birthday: "23/04/2000",
                    address: "Cl 50 No. 50A-16 COPACABANA, Medellín",
                    phone: "44010664",
                    city: "Medellín",
                    province: "Medellín",
                    country: "Colombia",
                    postCode: "110741",
                    role: "BASIC",
                    active: true,
                    photo: "https://img.freepik.com/fotos-premium/retrato-hombre-latino-fondo-negro_67651-1156.jpg?w=2000"
                }
                ,
                {
                    id: "14",
                    firstName: "Norman",
                    lastName: "Centeno",
                    email: "norman_centeno@test.com",
                    gender: "Masculino",
                    birthday: "23/04/2000",
                    address: "Cl 50 No. 39-52 L A 1, Medellín",
                    phone: "42397742",
                    city: "Medellín",
                    province: "Medellín",
                    country: "Colombia",
                    postCode: "110788",
                    role: "BASIC",
                    active: true,
                    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK98YaRurvoGcSaWRtIivk1NPMfpnBtEhtEQ&usqp=CAU"
                }
                ,
                {
                    id: "15",
                    firstName: "Benicio",
                    lastName: "Ornelas",
                    email: "benicio_ornelas@test.com",
                    gender: "Masculino",
                    birthday: "23/04/2000",
                    address: "Cl 13A No. 15-20, C.P 76001",
                    phone: "25575521",
                    city: "Cali",
                    province: "Cali",
                    country: "Colombia",
                    postCode: "110790",
                    role: "BASIC",
                    active: true,
                    photo: "https://img.freepik.com/fotos-premium/retrato-hombre-guapo-sonriente-rasgos-hispanos-latinos-mientras-lee-libro-al-aire-libre-concepto-estilo-vida-calle_210051-2.jpg?w=2000"
                }
                ,
                {
                    id: "16",
                    firstName: "Ruben",
                    lastName: "Cintrón",
                    email: "ruben_cintron@test.com",
                    gender: "Masculino",
                    birthday: "23/04/2000",
                    address: "Piso PB, Local 1A, Urbanización El Marqués",
                    phone: "+58 241-5636661",
                    city: "Caracas",
                    province: "Distrito Capital",
                    country: "Venezuela",
                    postCode: "0875",
                    role: "BASIC",
                    active: true,
                    photo: "https://img.freepik.com/fotos-premium/retrato-hombre-barbudo-sonriente-cerca-modelo-masculino-ojos-azules-expresion-facial-feliz-fondo-urbano-horizonte_164678-605.jpg?w=2000"
                }
                ,
                {
                    id: "17",
                    firstName: "Nora",
                    lastName: "Reina",
                    email: "oliver.espinoza@villalobos.info.ve",
                    gender: "Femenino",
                    birthday: "23/04/2000",
                    address: "Avenida Martin, 173, Apto 0",
                    phone: "+58 227 854 9633",
                    city: "Miramontes del Valle",
                    province: "Delta Amacuro",
                    country: "Venezuela",
                    postCode: "6158",
                    role: "BASIC",
                    active: true,
                    photo: "https://img.freepik.com/fotos-premium/imagen-vertical-vertical-mujer-latina-sonriendo-interior_330667-444.jpg?w=2000"
                }
                ,
                {
                    id: "18",
                    firstName: "Miguel",
                    lastName: "Soto",
                    email: "fernando73@hotmail.com",
                    gender: "Masculino",
                    birthday: "23/04/2000",
                    address: "Av. Mayorga, 1, Hab. 04",
                    phone: "209-9649731",
                    city: "Sanches de Altagracia",
                    province: "Sucre",
                    country: "Venezuela",
                    postCode: "1690",
                    role: "BASIC",
                    active: true,
                    photo: "https://img.freepik.com/foto-gratis/joven-empresario-exitoso-posando-sobre-pared-oscura_176420-52.jpg?w=2000"
                }
                ,
                {
                    id: "19",
                    firstName: "Marcos",
                    lastName: "Vazquez",
                    email: "marcos_vazquez@test.com",
                    gender: "Masculino",
                    birthday: "23/04/2000",
                    address: "Vereda Cervantes, Casa 40",
                    phone: "+58 483 2742213",
                    city: "El Almadel Valle",
                    province: "Distrito Capital",
                    country: "Venezuela",
                    postCode: "8967",
                    role: "BASIC",
                    active: true,
                    photo: "https://img.freepik.com/fotos-premium/hispano-arabe-apuesto-hombre-barbudo-confiado-tipo-brunet-anteojos-girar-cabeza-camara_717737-520.jpg?w=360"
                }
                ,
                {
                    id: "20",
                    firstName: "Alma",
                    lastName: "Castillo",
                    email: "alma.castillo@yahoo.es",
                    gender: "Femenino",
                    birthday: "23/04/2000",
                    address: "Avenida Carla Barraza, Apto 9",
                    phone: "+58 480 283 6589",
                    city: "Mar de Mata",
                    province: "Mérida",
                    country: "Venezuela",
                    postCode: "1059",
                    role: "BASIC",
                    active: true,
                    photo: "https://img.freepik.com/fotos-premium/retrato-joven-mujer-latina_58466-9036.jpg?w=2000"
                }
   

            ]
        })

        await prisma.adoptionPost.createMany({
            data: [
                {
                    id: "1",
                    createdAt: "2022-11-08T03:08:45.700Z",
                    name: "rayito",
                    size: "SMALL",
                    age: "1 años",
                    breed: "ave",
                    description: "Me dicen Rayito por mi parecido al Rayo McQueen",
                    photo: "https://img.freepik.com/foto-gratis/loro-color-muy-bonito-posado-rama-arbol_493961-1289.jpg?w=2000",
                    active: true,
                    userId: "1"
                },
                {
                    id: "2",
                    createdAt: "2022-11-08T03:08:45.700Z",
                    name: "meteoro",
                    size: "BIG",
                    age: "5 años",
                    breed: "tortuga",
                    description: "Me gusta correr",
                    photo: "https://img.freepik.com/foto-gratis/tortuga-estimulada-africana-hierba_167946-113.jpg?w=2000",
                    active: true,
                    userId: "2"
                },
                {
                    id: "3",
                    createdAt: "2022-11-08T03:08:45.700Z",
                    name: "caos",
                    size: "SMALL",
                    age: "3 años",
                    breed: "tortuga",
                    description: "Veni vidi vici",
                    photo: "https://img.freepik.com/fotos-premium/tortuga-sucata-suelo_41969-10112.jpg?w=2000",
                    active: true,
                    userId: "3"
                },
                {
                    id: "4",
                    createdAt: "2022-11-08T03:08:45.700Z",
                    name: "roberto",
                    size: "MEDIUM",
                    age: "2 meses",
                    breed: "gato",
                    description: "Soy muy juguetón y me gustan los humanos",
                    photo: "https://img.freepik.com/fotos-premium/lindo-gatito-gris-amarillo-ve-juega-negocios-copyspace_89381-2435.jpg?w=2000",
                    active: true,
                    userId: "4"
                },
                {
                    id: "5",
                    createdAt: "2022-11-08T03:08:45.700Z",
                    name: "Alfonso",
                    size: "SMALL",
                    age: "3 meses",
                    breed: "perro",
                    description: "Probablemente me adoptes, look at this",
                    photo: "https://img.freepik.com/free-photo/shallow-focus-shot-cute-golden-retriever-puppy-sitting-grass-ground_181624-24655.jpg?w=2000",
                    active: true,
                    userId: "5"
                },
                {
                    id: "6",
                    name: "camilo",
                    size: "MEDIUM",
                    age: "6 meses",
                    breed: "gato",
                    description: "Me gusta dormir mucho",
                    photo: "https://img.freepik.com/fotos-premium/hermoso-gato-ojos-azules_58409-14525.jpg?w=2000",
                    active: true,
                    userId: "6"
                },
                {
                    id: "7",
                    name: "Raul",
                    size: "BIG",
                    age: "2 meses",
                    breed: "perro",
                    description: "Me gusta jugar con mi hueso",
                    photo: "https://img.freepik.com/foto-gratis/lindo-perro-pastor-posando-aislado-sobre-fondo-blanco_155003-46179.jpg?w=2000",
                    active: true,
                    userId: "7"
                },
                {
                    id: "8",
                    name: "leo",
                    size: "MEDIUM",
                    age: "5 meses",
                    breed: "perro",
                    description: "Me gusta jugar con mi hueso",
                    photo: "https://img.freepik.com/fotos-premium/primer-plano-perro-raza-mixta-jadeando_191971-7459.jpg?w=2000",
                    active: true,
                    userId: "8"
                }
                ,
                {
                    id: "9",
                    name: "Cristiano",
                    size: "BIG",
                    age: "3 meses",
                    breed: "perro",
                    description: "Me gusta jugar con mi pelota y ver jugar a Messi",
                    photo: "https://img.freepik.com/fotos-premium/foto-vertical-cachorro-labrador-marron-cachorro-pequeno-expresion-adulta-dulce-perrito_106652-1123.jpg?w=2000",
                    active: true,
                    userId: "9"
                }
                ,
                {
                    id: "10",
                    name: "rafa",
                    size: "SMALL",
                    age: "1 años",
                    breed: "gato",
                    description: "Soy muy cariñoso y juguetón",
                    photo: "https://img.freepik.com/foto-gratis/cerrar-propietario-sosteniendo-lindo-gato_23-2149339568.jpg?w=2000",
                    active: true,
                    userId: "10"
                }
                ,
                {
                    id: "11",
                    name: "coco",
                    size: "SMALL",
                    age: "7 meses",
                    breed: "gato",
                    description: "Soy muy cariñoso con las personas",
                    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8vdq8XcrUFKWHTzBfK2taLeiumVdfWqy5KQ&usqp=CAU",
                    active: true,
                    userId: "11"
                }
                ,
                {
                    id: "12",
                    name: "niko",
                    size: "SMALL",
                    age: "6 meses",
                    breed: "gato",
                    description: "Vengo de un barrio chungo de Barcelona",
                    photo: "https://img.freepik.com/foto-gratis/gatito_658691-474.jpg?w=2000",
                    active: true,
                    userId: "12"
                }
                ,
                {
                    id: "13",
                    name: "merlot",
                    size: "MEDIUM",
                    age: "1 años",
                    breed: "gato",
                    description: "Soy muy cariñoso con las personas",
                    photo: "https://img.freepik.com/fotos-premium/hermoso-gato-ojos-azules_58409-14525.jpg?w=2000",
                    active: true,
                    userId: "13"
                }
                ,
                {
                    id: "14",
                    name: "lola",
                    size: "SMALL",
                    age: "6 meses",
                    breed: "roedor",
                    description: "cheese cheese cheese",
                    photo: "https://img.freepik.com/fotos-premium/hamster-dorado-alimentandose-delante-blanco_191971-22301.jpg?w=2000",
                    active: true,
                    userId: "14"
                }
                ,
                {
                    id: "15",
                    name: "alfonso",
                    size: "SMALL",
                    age: "2 años",
                    breed: "perro",
                    description: "Me habían dicho que iba a ser el único Alfonso",
                    photo: "https://img.freepik.com/foto-gratis/perro-pug-aislado-fondo-blanco_2829-11416.jpg?w=2000",
                    active: true,
                    userId: "15"
                }
                ,
                {
                    id: "16",
                    name: "reina",
                    size: "MEDIUM",
                    age: "5 años",
                    breed: "perro",
                    description: "Yass queen",
                    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnnIJ1ZbQepvJM2JzSax86RA3o1LCEVSl0Xg&usqp=CAU",
                    active: true,
                    userId: "16"
                }
            ]
        })
        await prisma.businessPost.createMany({
            data: [
                {
                    id: "1",
                    name: "Veterinaria pancitas",
                    contact: "321534564",
                    address: "cl 26 a 5 74 ",
                    description: "veterinaria con mas de 10 años de experiencia",
                    photo: "https://img.freepik.com/vector-premium/profesion-veterinaria-estilo-diseno-plano_180868-1407.jpg?w=2000",
                    type: "VETERINARY",
                    active: true,
                    ownerBusinessId: "3"
                },
                {
                    id: "2",
                    name: "Tienda patitas",
                    contact: "3215344474564",
                    address: "cra 426 a 5 74 ",
                    description: "tienda de comida para mascota",
                    photo: "https://img.freepik.com/vector-premium/tienda-mascotas-veterinaria-comida-perros_24877-61100.jpg?w=2000",
                    type: "SELLER",
                    active: true,
                    ownerBusinessId: "6"
                },
                {
                    id: "3",
                    name: "Cuidador de mascotas Janna Ruiz",
                    contact: "3215454734564",
                    address: "cl 284786 a 5 74 ",
                    description: "5 años de experiencia en cuidado animal",
                    photo: "https://img.freepik.com/vector-premium/cuidador-perros-o-voluntariado-mascotas-ilustracion-vector-servicio-pasear-perros_131590-418.jpg?w=2000",
                    type: "KEEPER",
                    active: true,
                    ownerBusinessId: "4"
                },
                {
                    id: "4",
                    name: "Peluqueria patitas",
                    contact: "3215344474564",
                    address: "cra 426 a 5 74 ",
                    description: "estilisamos a tus mascotas",
                    photo: "https://img.freepik.com/vector-premium/tienda-mascotas-fachada-exteriortienda-mascotas-edificio-tienda-banner-brillante-diseno-fachada-frontal_153905-111.jpg?w=2000",
                    type: "BARBER",
                    active: true,
                    ownerBusinessId: "5"
                }
            ]
        })    
        await prisma.product.createMany({
            data: [
                {
                    id: "1",
                    name: "Lanzador de Pelota de Tennis",
                    price: 900,
                    displayPrice: 1300,
                    description: "El Lanzador de Pelota de Tennis Puppis tiene un diseño que facilita el lanzamiento de la pelota, lo que reduce tu cansancio a la hora de jugar a la pelota con tu mascota. Además, tiene un sistema de manos libres que asegura que no tengas que tocar la pelota al levantarla, garantizando manos limpias. Es un gran juguete para lanzar la pelota a grandes distancias, lo que incentiva a que tu perro corra y desarrolle su estado físico, logrando un estado de salud óptimo.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/184994-1000-1000/269195.jpg?v=637792442821830000",
                    category: "TOY",
                    brand: "puppis",
                    size: "UNIQUE",
                    active: true,
                },
                {
                    id: "2",
                    name: "Pato de Vinilo",
                    price: 1200,
                    displayPrice: 1500,
                    description: "El Juguete Puppis Pato de Vinilo es ideal para jugar a lanzar y buscar con tu mascota, logrando mejorar su vínculo e incentivando a que tu perro haga ejercicio. Además, incluye sonido, lo que estimula la mente de tu mascota y ayuda a que descargue energía.",
                    stock: 100,
                    photo: "https://img.freepik.com/foto-gratis/primer-plano-pato-goma_53876-32073.jpg?w=2000",
                    category: "TOY",
                    brand: "puppis",
                    size: "UNIQUE",
                    active: true,
                },            
                {
                    id: "3",
                    name: "Peluche Zeus Mojo Spider Ball",
                    price: 900,
                    displayPrice: 1355,
                    description: "El Peluche Zeus, está hecho de un material suave pero resistente. Está pensado especialmente para cachorros, ya que tiene el tamaño y peso ideal para transportar. Además, su diseño divertido llama la atención y los estimula a jugar.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/174145-1000-1000/236104.jpg?v=637434938604730000",
                    category: "TOY",
                    brand: "puppis",
                    size: "UNIQUE",
                    active: true,
                },
                {
                    id: "4",
                    name: "Juguete Kong Classic II - XS",
                    price: 2900,
                    displayPrice: 3690,
                    description: "El Kong clásico es el estándar dorado de los juguetes de perro y ofrece un enriquecimiento a los canes al ayudarlos a satisfacer sus necesidades instintivas. Su fórmula es ultra durable y tiene un pique impredecible para jugar con las mascotas.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/160177-1000-1000/224155.jpg?v=636368490685030000",
                    category: "TOY",
                    brand: "kong",
                    size: "UNIQUE",
                    active: true,
                },
                {
                    id: "5",
                    name: "Juguete Kong Hueso Squeezz Action",
                    price: 3800,
                    displayPrice: 4120,
                    description: "El Peluche Zeus, está hecho de un material suave pero resistente. Está pensado especialmente para cachorros, ya que tiene el tamaño y peso ideal para transportar. Además, su diseño divertido llama la atención y los estimula a jugar.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/182632-1000-1000/224378.jpg?v=637673987003030000",
                    category: "TOY",
                    brand: "kong",
                    size: "UNIQUE",
                    active: true,
                },
                {
                    id: "6",
                    name: "Alimento Royal Canin Medium Adulto - 15 Kg",
                    price: 12000,
                    displayPrice: 15500,
                    description: "Royal Canin Medium Adult es un alimento para perros adultos de razas medianas (11 a 25 Kg) desde los 12 meses hasta los 7 años. Con palatabilidad reforzada mediante aromas naturales seleccionados, tamaño, forma y textura de la croqueta adaptados. Asegura una óptima digestibilidad gracias a las proteínas de alta calidad y al aporte equilibrado de fibras alimentarias. Royal Canin es líder en el mercado mundial de alimento balanceado para gatos y perros. Fundada en 1967 en Francia por un médico veterinario, Royal Canin asumió el compromiso de la Nutrición Salud, con el objetivo de aportar las respuestas nutricionales más innovadoras y adaptadas a las necesidades específicas de gatos y perros.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/190297-1000-1000/156154.jpg?v=638028352034700000",
                    category: "FOOD",
                    brand: "royal canin",
                    size: "MEDIUM",
                    active: true,
                },
                {
                    id: "7",
                    name: "Alimento Old Prince Novel Cordero y Arroz Perro Adulto Mediano y Grande - 15+3 Kg",
                    price: 8000,
                    displayPrice: 9620,
                    description: "El Alimento Old Prince Novel Cordero y Arroz Perro Adulto Mediano Y Grande, aporta un correcto equilibrio entre el nivel, la calidad y el origen de las proteínas. Hecho con proteínas de origen no convencional que minimizan las probabilidades de alergias alimentarias y cutáneas.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/186507-1000-1000/148052.jpg?v=637871009908500000",
                    category: "FOOD",
                    brand: "old prince",
                    size: "MEDIUM",
                    active: true,
                },
                {
                    id: "8",
                    name: "Alimento Royal Canin Mini Adulto - 7,5 Kg",
                    price: 8000,
                    displayPrice: 9855,
                    description: "Royal Canin Mini Adult es un alimento para perros adultos de tamaño pequeño (de 1 a 10 Kg) desde los 10 meses hasta los 8 años. La L-Carnitina estimula el metabolismo de las reservas grasas. Satisface las necesidades energéticas gracias al contenido adaptado en calorías ( Royal Canin es líder en el mercado mundial de alimento balanceado para gatos y perros. Fundada en 1967 en Francia por un médico veterinario, Royal Canin asumió el compromiso de la Nutrición Salud, con el objetivo de aportar las respuestas nutricionales más innovadoras y adaptadas a las necesidades específicas de gatos y perros.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/190298-1000-1000/156177.jpg?v=638028354661430000",
                    category: "FOOD",
                    brand: "royal canin",
                    size: "SMALL",
                    active: true,
                },
                {
                    id: "9",
                    name: "Alimento Eukanuba Para Perro Adulto Raza Mediana - 15 Kg",
                    price: 10000,
                    displayPrice: 12555,
                    description: "El Alimento Eukanuba Adulto Medium Breed es un alimento balanceado completo para perros adultos mayores a 12 meses de edad y de razas medianas como Bulldog Francés, Beagle, Bretón, Cocker, Boxer, Schnauzer Standard y otras razas o perros mestizos que pesan entre 10 y 25 kg. Las fórmulas para adulto de EUKANUBA aseguran un nivel de glucosa en sangre adecuado y sostenido en el tiempo, y una digestión más prolongada gracias al balance especial entre diferentes tipos de granos.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/161972-1000-1000/Adulto-Medium-Breed-3Kg.jpg?v=636469526958730000",
                    category: "FOOD",
                    brand: "eukanuba",
                    size: "MEDIUM",
                    active: true,
                },
                {
                    id: "10",
                    name: "MAINTENANCE CRIADORES Adulto - 22 kg",
                    price: 3000,
                    displayPrice: 4355,
                    description: "El Alimento Maintenance Criadores Adulto está desarrollado especialmente para perros adultos de todos los tamaños, de entre 1 y 7 años de edad. Su fórmula incluye proteínas de carne y pollo de alto valor biológico, fibras, minerales, vitaminas y ácidos grasos, resultando en una nutrición completa para tu mascota.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/158003-1000-1000/150002.png?v=635894318957130000",
                    category: "FOOD",
                    brand: "maintenance criadores",
                    size: "MEDIUM",
                    active: true,
                },
                {
                    id: "11",
                    name: "Alimento Pro Plan Reduced Calorie para Perro Adulto - 15 Kg",
                    price: 12000,
                    displayPrice: 16605,
                    description: "El Alimento Pro Plan Reduced Calorie está fabricado con una fórmula de vanguardia que ayuda a lograr un peso corporal ideal, facilita la pérdida de peso en forma sana y protege a largo plazo la salud general de tu mascota. Un peso corporal saludable y una condición corporal magra son de suma importancia para mejorar la salud y aumentar la longevidad de tu perro. Además, contiene fuente natural de tres tipos de fibras que sacian el apetito manteniendo a los perros satisfechos.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/179873-1000-1000/7613287033130_1.png?v=637570861574070000",
                    category: "FOOD",
                    brand: "pro plan",
                    size: "MEDIUM",
                    active: true,
                },
                {
                    id: "12",
                    name: "Alimento Pro Plan Active Mind Perro Mediano y Grande - 15Kg",
                    price: 12000,
                    displayPrice: 15855,
                    description: "Purina Pro Plan provee nutrición de avanzada para proteger a los perros mayores de 7 años, manteniéndolos sanos y activos. A su vez, refuerza el sistema inmunológico, mantiene saludables las articulaciones y refuerza la atención mental. Formulado con fuentes naturales de glucosamina, que ayudan a mantener las articulaciones sanas y una movilidad óptima. Contiene una proporción equilibrada de proteína y grasa para mantener la masa muscular magra, una combinación de antioxidantes naturales y vitaminas E y C.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/179848-1000-1000/7613287032911_1.png?v=637570861499770000",
                    category: "FOOD",
                    brand: "pro plan",
                    size: "MEDIUM",
                    active: true,
                },
                {
                    id: "13",
                    name: "Shampoo Moksha Belleza Con Henna - 250 Cc",
                    price: 300,
                    displayPrice: 500,
                    description: "Shampoo para extra brillo.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/169227-1000-1000/371054.jpg?v=637133172708670000",
                    category: "HEALTH",
                    brand: "moksha",
                    size: "UNIQUE",
                    active: true,
                },
                {
                    id: "14",
                    name: "Shampoo Algas Vitalizador Y Abrillantador Osspret - 250 Cc",
                    price: 500,
                    displayPrice: 955,
                    description: "Shampoo a base de algas para un mejor brillo de tu mascota.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/157369-1000-1000/Osspret_algas_iktkop.jpg?v=635773197331430000",
                    category: "HEALTH",
                    brand: "osspret",
                    size: "UNIQUE",
                    active: true,
                },
                {
                    id: "15",
                    name: "Shampoo Tonalizador Negro Osspret - 250 Cc",
                    price: 500,
                    displayPrice: 975,
                    description: "Shampoo para pelaje oscuro, rejuvence el pelaje.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/157378-1000-1000/Osspret_tonalizador_negro_dokwar.jpg?v=635773197425030000",
                    category: "HEALTH",
                    brand: "osspret",
                    size: "UNIQUE",
                    active: true,
                },
                {
                    id: "16",
                    name: "Caja Mon Ami Churrasquitos Grille - 400 Gr",
                    price: 1200,
                    displayPrice: 1755,
                    description: "La Caja Mon Ami De Churrasquito Grillé, contiene snacks perfectos para premiar a tu mascota, demostrarles afecto y mejorar su vínculo. Están fabricados con ingredientes 100% naturales para asegurar que tu perro tenga una dieta de alta calidad y saludable. Además, incluyen carne fresca, que hacen del snack súper nutritivo y sabroso para tu mascota.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/184272-1000-1000/233055.png?v=637733510416600000",
                    category: "SNACK",
                    brand: "Mon Ami",
                    size: "UNIQUE",
                    active: true,
                },
                {
                    id: "17",
                    name: "Snack Pedigree Rodeo Sabor Carne - 4 Unids.",
                    price: 100,
                    displayPrice: 355,
                    description: "Snack sabor carne, con fibra y calcio.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/182277-1000-1000/235025.jpg?v=637650377904600000",
                    category: "SNACK",
                    brand: "pedigree",
                    size: "UNIQUE",
                    active: true,
                },
                {
                    id: "18",
                    name: "Hueso Corbata Perro CanCat - 7/8",
                    price: 800,
                    displayPrice: 955,
                    description: "Los huesos de CanCAT son juguetes que fortalecen los dientes de tu mascota, elaborados con material de la mejor calidad, ayuda a ejercitar la mandíbula, también disminuyen el sarro, limpiando y dando brillo a los dientes, fortalecen las encías, gracias a este juguete se puede prevenir el mal aliento y liberarse del estrés. Extra-Grande: 22cm (largo) Grande: 19cm (largo) Mediano: 16cm (largo) Chico: 13cm (largo) Mini: 10cm (largo)",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/158933-1000-1000/M.jpg?v=636110980424170000",
                    category: "TOY",
                    brand: "cancat",
                    size: "UNIQUE",
                    active: true,
                },
                {
                    id: "19",
                    name: "Camiseta Argentina Del Mundial Con Escudo",
                    price: 2900,
                    displayPrice: 3655,
                    description: "Camiseta de Argentina para que tu mascota aliente a la seleccion.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/189177-1000-1000/275032-275033-275034-275035-275036-275037.jpg?v=637979983148900000",
                    category: "ACCESORIES",
                    brand: "propia",
                    size: "UNIQUE",
                    active: true,
                },
                {
                    id: "20",
                    name: "Comedero Acero Inoxidable Puppis 0.85 L",
                    price: 1500,
                    displayPrice: 1855,
                    description: "El Comedero de acero inoxidable, cuenta con una base de goma antideslizante y borde siliconado para una mejor alimentación perruna.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/189247-1000-1000/269356.jpg?v=637979986998170000",
                    category: "ACCESORIES",
                    brand: "puppis",
                    size: "SMALL",
                    active: true,
                }
                ,
                {
                    id: "21",
                    name: "Comedero Comelento Pawise - 1500 ml",
                    price: 1500,
                    displayPrice: 2355,
                    description: "Comedero para que tu mascota coma mas lento.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/183121-1000-1000/237619.jpg?v=637698186241800000",
                    category: "ACCESORIES",
                    brand: "puppis",
                    size: "MEDIUM",
                    active: true,
                }                
                ,
                {
                    id: "22",
                    name: "Antipulgas Y Garrapatas Bravecto Para Perros - 2 a 4,5 Kg",
                    price: 4000,
                    displayPrice: 5200,
                    description: "Antipulgas y Garrapatas para perros pequeños",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/167383-1000-1000/366255.jpg?v=637014017122630000",
                    category: "HEALTH",
                    brand: "bravecto",
                    size: "UNIQUE",
                    active: true,
                }
                ,
                {
                    id: "23",
                    name: "Nexgard Spectra Para Perros - 2 a 3,5 Kg",
                    price: 1500,
                    displayPrice: 1980,
                    description: "Tableta masticable sabor carne, mata parasitos y garrapatas.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/170186-1000-1000/337013.png?v=637142658788130000",
                    category: "HEALTH",
                    brand: "frontline vet labs",
                    size: "UNIQUE",
                    active: true,
                }
                ,
                {
                    id: "24",
                    name: "Nexgard Para Perros Extra Grandes En Comprimidos - 25-50kg",
                    price: 2100,
                    displayPrice: 2955,
                    description: "Comedero para que tu mascota coma mas lento.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/170185-1000-1000/300057.png?v=637142654515000000",
                    category: "HEALTH",
                    brand: "frontline vet labs",
                    size: "UNIQUE",
                    active: true,
                }
                ,
                {
                    id: "25",
                    name: "Antiparasitario Externo Ecthol Para Perro Y Ambiente - 100Cc",
                    price: 900,
                    displayPrice: 1280,
                    description: "Antiparasitario externo para perros y ambientes.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/158377-1000-1000/382048.jpg?v=635993660628100000",
                    category: "HEALTH",
                    brand: "ambiental perros",
                    size: "UNIQUE",
                    active: true,
                }
                ,
                {
                    id: "26",
                    name: "Antiparasitario Externo Ecthol 5 - 70ml",
                    price: 110,
                    displayPrice: 640,
                    description: "Antiparasitario externo.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/159827-1000-1000/ecthol-5-fco-x-120-cc-ho.jpg?v=636264854251800000",
                    category: "HEALTH",
                    brand: "ecthol",
                    size: "SMALL",
                    active: true,
                }
                ,
                {
                    id: "27",
                    name: "Antiparasitario Revolution 12% 0,25ml - 2,6-5Kg",
                    price: 1500,
                    displayPrice: 2290,
                    description: "Desparasitante, endectocida para perros. Solucion de uso topico.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/188680-1000-1000/382098.jpg?v=637951333289800000",
                    category: "HEALTH",
                    brand: "zoetis",
                    size: "UNIQUE",
                    active: true,
                }
                ,
                {
                    id: "28",
                    name: "Antiparasitario Revolution 6% 0,25ml - Hasta 2,5Kg",
                    price: 2100,
                    displayPrice: 2070,
                    description: "Comedero para que tu mascota coma mas lento.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/188683-1000-1000/382102.jpg?v=637951336662300000",
                    category: "HEALTH",
                    brand: "zoetis",
                    size: "UNIQUE",
                    active: true,
                }
                ,
                {
                    id: "29",
                    name: "Peluche Kong Dr. Noyz Pato - XS",
                    price: 900,
                    displayPrice: 1305,
                    description: "El Peluche Kong Pato ,es un juguete de peluche suave y con un diseño amigable, ideal para divertirse, especialmente los cachorros. Está fabricado con una capa adicional de material para mayor resistencia, menos relleno para menor desorden y está recomendado para uso en interiores. Además cuenta con un sonido que a los perros les encanta que se puede extraer para un juego silencioso.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/175010-1000-1000/224328.jpg?v=637461400979200000",
                    category: "TOY",
                    brand: "kong",
                    size: "UNIQUE",
                    active: true,
                }
                ,
                {
                    id: "30",
                    name: "Hueso Lazy Dog con Pelota Animal Print - 10cm",
                    price: 1000,
                    displayPrice: 1250,
                    description: "El Juguete Lazy Dog Hueso con Pelota combina el rebote errático de una pelota con la diversión de tironear de una soga. Está fabricado con materiales de alta calidad que aseguran que el juguete dure y que tu perro se divierta.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/183633-1000-1000/275117.jpg?v=637710847828100000",
                    category: "TOY",
                    brand: "lazy dog",
                    size: "UNIQUE",
                    active: true,
                }
                ,
                {
                    id: "31",
                    name: "Mordillo Cancat Pescado Ice",
                    price: 2500,
                    displayPrice: 3170,
                    description: "El Pescado Ice Cancat, está fabricado con goma TPR no tóxica, es un juguete resistente, seguro y extremadamente duradero. Está diseñado para que su mascota mastique, juegue y se refresque a pura diversión.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/169168-1000-1000/221188.jpg?v=637122023367600000",
                    category: "TOY",
                    brand: "cancat",
                    size: "UNIQUE",
                    active: true,
                }
                ,
                {
                    id: "32",
                    name: "Juguete CanCat Soga Con Doble Nudo - 13'",
                    price: 1000,
                    displayPrice: 1755,
                    description: "La Soga con doble nudo Cancat pertenece a la línea de sogas FUN, diseñada especialmente para que tu mascota libere su stress mientras juega en el clásico “tira y afloje”. Ideal para interactuar con nuestro perro. También se usan para que tu mejor amigo pueda morder y fortalecer sus dientes.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/168607-1000-1000/221102.jpg?v=637084102178200000",
                    category: "TOY",
                    brand: "cancat",
                    size: "UNIQUE",
                    active: true,
                }
                ,
                {
                    id: "34",
                    name: "Juguete M-Pets Ecológico Thor Verde",
                    price: 4500,
                    displayPrice: 6355,
                    description: "Peluche ecologico para morder.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/187584-1000-1000/237717.jpg?v=637908257963570000",
                    category: "TOY",
                    brand: "thor",
                    size: "UNIQUE",
                    active: true,
                }
                ,
                {
                    id: "35",
                    name: "Juguete M-Pets Ecológico Leif Verde",
                    price: 3500,
                    displayPrice: 5000,
                    description: "Peluche ecologico para morder.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/187421-1000-1000/237719.jpg?v=637897100116030000",
                    category: "TOY",
                    brand: "leif",
                    size: "UNIQUE",
                    active: true,
                }
                ,
                {
                    id: "36",
                    name: "Juguete M-Pets Ecológico Lars Verde",
                    price: 4500,
                    displayPrice: 6355,
                    description: "Peluche ecologico para morder.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/187581-1000-1000/237716.jpg?v=637908256242100000",
                    category: "TOY",
                    brand: "lars",
                    size: "UNIQUE",
                    active: true,
                }
                ,
                {
                    id: "37",
                    name: "Juguete Rascals Anillo Dispenser Amarillo",
                    price: 2000,
                    displayPrice: 3355,
                    description: "El Juguete Rascals Anillo Dispenser Amarillo, está pensado para que tu perro pueda divertirse y jugar en todo momento, logrando así una vida alegre y libre de estrés. Además, el juguete se puede rellenar con snacks saludables, haciendo que tu mascota utilice la curiosidad y el ingenio para encontrarlos. Esto lo vuelve una gran opción para estimular el desarrollo mental de tu perro y lograr un nivel de actividad óptimo.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/180400-1000-1000/237559.jpg?v=637590641461200000",
                    category: "TOY",
                    brand: "rascals",
                    size: "UNIQUE",
                    active: true,
                }
                ,
                {
                    id: "38",
                    name: "Soga Rascals Ecológica Dos Nudos con Juguete",
                    price: 2000,
                    displayPrice: 3155,
                    description: "La Soga Rascals Ecológica Dos Nudos con Juguete, está confeccionada con materiales reciclados y reutilizables. Pensada para que puedas jugar con tu mejor amigo tanto en tu casa como al aire libre. Es súper duradera y resistente.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/180398-1000-1000/237558.jpg?v=637590641454970000",
                    category: "TOY",
                    brand: "rascals",
                    size: "UNIQUE",
                    active: true,
                }
                ,
                {
                    id: "39",
                    name: "Snack Mon Ami Trainee Sabor Pollo - 400 Gr",
                    price: 1100,
                    displayPrice: 1880,
                    description: "Los Snacks Mon Ami Trainee, han sido diseñados especialmente para entrenadores profesionales y para aquellos que disfrutan de educar a su mascota. Su tamaño y calidad permiten la entrega de varias unidades a lo largo de una sesión de entrenamiento. Además, están fabricados con ingredientes 100% naturales para asegurar que tu perro tenga una dieta de alta calidad y saludable.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/171616-1000-1000/233057.png?v=637292779292170000",
                    category: "SNACK",
                    brand: "mon ami",
                    size: "UNIQUE",
                    active: true,
                }
                ,
                {
                    id: "40",
                    name: "Palitos Pets Fortificados 3/8 - 10 Uni",
                    price: 110,
                    displayPrice: 370,
                    description: "Los Palitos Pets Fortificados 3/8, son una excelente opción para premiar a tu perro con un rico snack, ya sea en entrenamientos o en un día de juego. Cuentan con una textura granulada para que tu mascota los disfrute mucho más.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/189005-1000-1000/488001.jpg?v=637965279065270000",
                    category: "SNACK",
                    brand: "pets",
                    size: "UNIQUE",
                    active: true,
                }
                ,
                {
                    id: "41",
                    name: "Snack Eukanuba Active Trainers Chicken - 142 g",
                    price: 500,
                    displayPrice: 1035,
                    description: "El Snack Eukanuba Active Trainers Chicken está diseñado para acompañar el entrenamiento regular de tu perro a partir de los 2 meses de edad. El entrenamiento es esencial para lograr el correcto desarrollo mental de tu mascota, por lo que el snack incluye DHA para lograr una función cerebral saludable. Además, ayudan a promover el ejercicio físico para que tu mascota tenga músculos magros y buena salud.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/185911-1000-1000/138152.png?v=637834883270270000",
                    category: "SNACK",
                    brand: "eukanuba",
                    size: "UNIQUE",
                    active: true,
                }
                ,
                {
                    id: "42",
                    name: "Hueso Horneado Golocan Carne",
                    price: 50,
                    displayPrice: 110,
                    description: "Hueso horneado, sabor carne, sin colorantes.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/174281-1000-1000/434071.jpg?v=637434938954600000",
                    category: "SNACK",
                    brand: "golocan",
                    size: "UNIQUE",
                    active: true,
                }
                ,
                {
                    id: "43",
                    name: "Pet & Pop Dental Stick Vegan - 50 Gr",
                    price: 100,
                    displayPrice: 200,
                    description: "Palitos dentales y veganos.",
                    stock: 0,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/170968-1000-1000/233069.jpg?v=637237763745870000",
                    category: "SNACK",
                    brand: "pets",
                    size: "UNIQUE",
                    active: true,
                }
                ,
                {
                    id: "44",
                    name: "Hueso Cancat Corbata - XS",
                    price: 110,
                    displayPrice: 330,
                    description: "Los Palitos Pets Fortificados 3/8, son una excelente opción para premiar a tu perro con un rico snack, ya sea en entrenamientos o en un día de juego. Cuentan con una textura granulada para que tu mascota los disfrute mucho más.",
                    stock: 0,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/189111-1000-1000/400016.jpg?v=637974604517430000",
                    category: "SNACK",
                    brand: "cancat",
                    size: "BIG",
                    active: true,
                }
                ,
                {
                    id: "45",
                    name: "Dr. Zoo Sticks Max Sabor Carne Asada - 20 Gr",
                    price: 40,
                    displayPrice: 70,
                    description: "Los Snacks de Dr. Zoo son ideales para cualquier mascota por su tamaño, calidad, consistencia y sabor. Hechos con ingredientes naturales, son deliciosos y nutritivos. Ya sea para premiarlo o entretenerlo, no dejes de probarlos.",
                    stock: 0,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/163580-1000-1000/239341.jpg?v=636746890776870000",
                    category: "SNACK",
                    brand: "dr.zoo",
                    size: "UNIQUE",
                    active: true,
                }
                ,
                {
                    id: "46",
                    name: "Dr. Zoo Sticks Max Sabor Costillitas - 20 Gr",
                    price: 20,
                    displayPrice: 65,
                    description: "Los Snacks de Dr. Zoo son ideales para cualquier mascota por su tamaño, calidad, consistencia y sabor. Hechos con ingredientes naturales, son deliciosos y nutritivos. Ya sea para premiarlo o entretenerlo, no dejes de probarlos.",
                    stock: 0,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/163579-1000-1000/239340.jpg?v=636746890774830000",
                    category: "SNACK",
                    brand: "dr.zoo",
                    size: "UNIQUE",
                    active: true,
                }
                ,
                {
                    id: "47",
                    name: "Palitos Dr. Zoo Nuggets - 5Kg",
                    price: 3000,
                    displayPrice: 6230,
                    description: "Palitos Dr.Zoo nugguets.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/174724-1000-1000/439060.jpg?v=637452603492570000",
                    category: "SNACK",
                    brand: "pets",
                    size: "BIG",
                    active: true,
                }
                ,
                {
                    id: "48",
                    name: "Palitos Pets Fortificados 3/8 - 10 Uni",
                    price: 110,
                    displayPrice: 370,
                    description: "Los Palitos Pets Fortificados 3/8, son una excelente opción para premiar a tu perro con un rico snack, ya sea en entrenamientos o en un día de juego. Cuentan con una textura granulada para que tu mascota los disfrute mucho más.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/189005-1000-1000/488001.jpg?v=637965279065270000",
                    category: "SNACK",
                    brand: "pets",
                    size: "UNIQUE",
                    active: true,
                },
                {
                    id: "49",
                    name: "Zanahoria Deshidratada Zootec Veggie - 60gr",
                    price: 1472,
                    displayPrice: 1500,
                    description: "La Zanahoria Deshidratada Zootec Veggie, es un snack 100% natural y saludable hecho de zanahoria deshidratada. Es ideal para dar como premio tanto a aves o roedores, ya que es alto en vitamina c y funciona como complemento vitamínico",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/TB_ICBC_HSBC.png?v=202112291907",
                    category: "SNACK",
                    brand: "pets",
                    size: "UNIQUE",
                    active: true,
                },
                {
                    id: "50",
                    name: "Palitos Pets Fortificados 3/8 - 10 Uni",
                    price: 110,
                    displayPrice: 370,
                    description: "Los Palitos Pets Fortificados 3/8, son una excelente opción para premiar a tu perro con un rico snack, ya sea en entrenamientos o en un día de juego. Cuentan con una textura granulada para que tu mascota los disfrute mucho más.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/189005-1000-1000/488001.jpg?v=637965279065270000",
                    category: "SNACK",
                    brand: "Zootec",
                    size: "UNIQUE",
                    active: true,
                },
                {
                    id: "51",
                    name: "Whiskas Gato Pouch Soufle De Pescado - 85Gr",
                    price: 127,
                    displayPrice: 135,
                    description: "Alimento humedo para gato",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/161727-1000-1000/Render-Whiskas-sobre-Soufle-pescado-copy.jpg?v=636434033665670000",
                    category: "SNACK",
                    brand: "whishkas",
                    size: "UNIQUE",
                    active: true,
                },
                {
                    id: "52",
                    name: "Voraz Mix Adulto Carne-Pollo-Vegetales - 15 Kg",
                    price: 2533,
                    displayPrice: 2600,
                    description: "El Alimento Voraz Mix Adulto Carne-Pollo-Vegetales  está diseñado para satisfacer las necesidades nutricionales de los perros de todos los tamaños a partir del año y hasta los 7 años de edad.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/189288-600-600/141020.jpg?v=637981565838100000",
                    category: "FOOD",
                    brand: "pets",
                    size: "UNIQUE",
                    active: true,
                },
                {
                    id: "53",
                    name: "Vitalcan Therapy Canine Renal Care - 10kg",
                    price: 11331,
                    displayPrice: 12000,
                    description: "VITALCAN THERAPY CANINE RENAL CARE es un alimento de prescripción para perros adultos con enfermedad renal crónica (ERC). Su bajo contenido de fósforo y moderada cantidad de proteínas de alto valor biológico y digestibilidad, contribuye al tratamiento de esta afección.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/160236-1000-1000/Vitalcan-Therapy-Canine-Renal-Care.jpg?v=636377132710500000",
                    category: "HEALTH",
                    brand: "Therapy",
                    size: "UNIQUE",
                    active: true,
                },
                {
                    id: "54",
                    name: "Turtle Clean Exo Terra - 120ml",
                    price: 2552,
                    displayPrice: 2700,
                    description: "El Turtle Clean Exo Terra, es un limpiador de hábitat de tortugas 100% biológico que, cuando se usa semanalmente, ayuda a controlar los olores y descomponer los desechos orgánicos sólidos. Además de mantener el hogar de tu mascota limpio y fresco, contribuye a establecer una flora biológica adecuada para garantizar que los desechos orgánicos se descompongan de forma regular.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/176324-1000-1000/253084.jpg?v=637534369655300000",
                    category: "HYGIENE",
                    brand: "Exo Terra",
                    size: "UNIQUE",
                    active: true,
                },
                {
                    id: "55",
                    name: "Tunel Zootec De Tela - 50 Cm",
                    price: 4836,
                    displayPrice: 4950,
                    description: "El Tunel Zootec De Tela, es una excelente opción para que tu gatito pase las mejores horas de juego. Está hecho en materiales resistentes, con colores que llaman su atención.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/173419-1000-1000/239356.jpg?v=637395982310500000",
                    category: "TOY",
                    brand: "Zootec",
                    size: "UNIQUE",
                    active: true,
                },
                {
                    id: "56",
                    name: "Tunel Para Aves - 10x20",
                    price: 1997,
                    displayPrice: 2050,
                    description: "Tunel para aves hecho en madera, disponible en distintos colores",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/166856-1000-1000/242107.jpg?v=636957681305730000",
                    category: "ACCESORIES",
                    brand: "pets",
                    size: "UNIQUE",
                    active: true,
                },
                {
                    id: "57",
                    name: "Tunel Catit Vesper Para Gatos - 68x97x28 Cm",
                    price: 6712,
                    displayPrice: 6800,
                    description: "Tunel de poliester de 50cm de diametro y 200cm de largo",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/169142-1000-1000/227221.jpg?v=637122023216200000",
                    category: "TOY",
                    brand: "pets",
                    size: "BIG",
                    active: true,
                },
                {
                    id: "58",
                    name: "Tubo Masticable De Alfalfa Para Roedores - Chico",
                    price: 1008,
                    displayPrice: 1100,
                    description: "Tube de alfalfa de 70 gramos, ideal para roedores",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/166095-1000-1000/142067.png?v=636880949052830000",
                    category: "HYGIENE",
                    brand: "pets",
                    size: "UNIQUE",
                    active: true,
                },
                {
                    id: "59",
                    name: "Transportadora Vari Kennel Compass (4 variantes) - Gigante",
                    price: 41144,
                    displayPrice: 42000,
                    description: "Transportadora para perro extra grande, certificada , disponible en color blanco o gris",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/157420-1000-1000/compass_w0fk3t.jpg?v=635779129831270000",
                    category: "ACCESORIES",
                    brand: "pets",
                    size: "BIG",
                    active: true,
                },
                {
                    id: "60",
                    name: "TetraFin Goldfish Flakes - 28 Gr",
                    price: 1248,
                    displayPrice: 1300,
                    description: "Alimento extra fino para peces",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/176727-1000-1000/imagen4.jpg?v=637556935418230000",
                    category: "FOOD",
                    brand: "Tetra",
                    size: "UNIQUE",
                    active: true,
                },
                {
                    id: "61",
                    name: "Test De PH Tetra - Tamaño Único",
                    price: 2448,
                    displayPrice: 2500,
                    description: "Test de pH para agua de pecera",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/168863-1000-1000/232167.png?v=637093489134800000",
                    category: "HEALTH",
                    brand: "Tetra",
                    size: "UNIQUE",
                    active: true,
                },
                {
                    id: "62",
                    name: "Sticks Dr. Zoo Carne Asada - 5Kg",
                    price: 7563,
                    displayPrice: 7600,
                    description: "Golosinas de carne para perro",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/174721-1000-1000/439057.jpg?v=637452603483000000",
                    category: "SNACK",
                    brand: "Dr. Zoo",
                    size: "UNIQUE",
                    active: true,
                },
                {
                    id: "63",
                    name: "Rueda Para Roedores Ferplast Blanca - 20,5Cm",
                    price: 8692,
                    displayPrice: 8750,
                    description: "Rueda de ejercicio para roedores color blanca",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/168136-1000-1000/297165.jpg?v=637051066973300000",
                    category: "ACCESORIES",
                    brand: "Ferplast",
                    size: "UNIQUE",
                    active: true,
                },
                {
                    id: "64",
                    name: "Botitas Pawise Doggy Boots - L",
                    price: 2025,
                    displayPrice: 2100,
                    description: "Botitas termicas para perro, talla grande",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/175567-1000-1000/237270-2.png?v=637499498231800000",
                    category: "ACCESORIES",
                    brand: "Pawise",
                    size: "BIG",
                    active: true,
                },
                {
                    id: "65",
                    name: "Abrigo Impermeable MPC con Corderito - XXS",
                    price: 3940,
                    displayPrice: 4100,
                    description: "Abrigo termico para perro, talla pequeña",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/187241-600-600/216065.jpg?v=637896956318470000",
                    category: "ACCESORIES",
                    brand: "Ferplast",
                    size: "SMALL",
                    active: true,
                },
                {
                    id: "66",
                    name: "Chaleco MiAmore Matelasse Flores",
                    price: 2645,
                    displayPrice: 2700,
                    description: "Chaleco impermeable para perro talla unica",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/187429-1000-1000/237770.jpg?v=637897100160830000",
                    category: "ACCESORIES",
                    brand: "MiAmore",
                    size: "UNIQUE",
                    active: true,
                },
                {
                    id: "67",
                    name: "Comedero Food Tree Catit 2.0 Para Gatos - Blanco Y Verde",
                    price: 6621,
                    displayPrice: 6700,
                    description: "El Catit Food Tree es la solución de alimentación para gatos que tienden a comer rápido. Este juguete es estimula a comer más lento y trabajar para conseguir su comida mientras juegan moviendo la comida con su pata a través de varias aberturas laterales. El alimento suelto se recoge en la bandeja en la parte inferior, evitando derrames. Su diseño poco profundo permite a los gatos disfrutar de su comida con comodidad, sin poner tensión en sus bigotes sensibles. También puedes ajustar diferentes niveles de dificultad girando el disco del medio y ajustando los tamaños de apertura. Añade más variedad cambiando periódicamente la cantidad de pienso que pones y/o la ubicación del juguete en la casa. El Catit Food Tree es fácil de desmontar y limpiar. Se recomienda lavar a mano cada parte con jabón natural, libre de productos químicos o soluciones abrasivas y enjuagar a fondo. Este comedero para gatos es excelente individualmente o en combinación con otros productos Catit Senses 2.0",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/159050-1000-1000/200987-01.jpg?v=636130962349370000",
                    category: "ACCESORIES",
                    brand: "Catit",
                    size: "UNIQUE",
                    active: true,
                },
                {
                    id: "68",
                    name: "Comedero Zaara Puppis Celeste - 0.85 L",
                    price: 2371,
                    displayPrice: 2400,
                    description: "Rueda de ejercicio para roedores color blanca",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/189235-1000-1000/269348.jpg?v=637979986955030000",
                    category: "ACCESORIES",
                    brand: "Puppis",
                    size: "MEDIUM",
                    active: true,
                },
                {
                    id: "69",
                    name: "Rueda Para Roedores Ferplast Blanca - 20,5Cm",
                    price: 8692,
                    displayPrice: 8750,
                    description: "El Comedero de acero inoxidable, cuenta con una base de goma antideslizante para una mejor alimentación perruna.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/168136-1000-1000/297165.jpg?v=637051066973300000",
                    category: "ACCESORIES",
                    brand: "Ferplast",
                    size: "UNIQUE",
                    active: true,
                },
                {
                    id: "70",
                    name: "Bandeja Hueso Animal Pet de Silicona Celeste",
                    price: 2254,
                    displayPrice: 2350,
                    description: "Bandeja color azul celest hecha de silicona con forma de hueso",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/185771-1000-1000/246334.jpg?v=637832328245600000",
                    category: "ACCESORIES",
                    brand: "Ferplast",
                    size: "UNIQUE",
                    active: true,
                },
                {
                    id: "71",
                    name: "Comedero Bebedero Animal Pet Curvo Naranja - Large",
                    price: 6144,
                    displayPrice: 6400,
                    description: "Este Comedero Bebedero Animal Pet Curvo Naranja es sumamente práctico para tu mascota, ya que engloba las dos cosas en un solo elemento, brindando mayor comodidad y restringiendo el área de alimentación, lo cual brinda mayor limpieza.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/176782-1000-1000/246206.jpg?v=637556935676030000",
                    category: "ACCESORIES",
                    brand: "Ferplast",
                    size: "BIG",
                    active: true,
                },
                {
                    id: "72",
                    name: "Contenedor Puppis con Tapa Amarillo - 3kg",
                    price: 1239,
                    displayPrice: 1300,
                    description: "El Contenedor Puppis con Tapa es una forma práctica y cómoda para guardar el alimento balanceado de tu mascota. Al tener tapa, se asegura que el alimento se mantenga fresco y se conserve por la mayor cantidad de tiempo posible.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/182520-1000-1000/269224.jpg?v=637667934326600000",
                    category: "ACCESORIES",
                    brand: "Puppis",
                    size: "UNIQUE",
                    active: true,
                },
                {
                    id: "73",
                    name: "Comedero Rascals Comelento Blanco - 21x18x5cm",
                    price: 3464,
                    displayPrice: 3550,
                    description: "El Comedero Rascals Comelento, está diseñado con ranuras que ayudan a que tu mascota coma de manera lenta y controlada. Esto previene posibles atragantamientos y vómitos, como también regula su alimentación y promueve un peso saludable.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/176475-1000-1000/237519.jpg?v=637546240057400000",
                    category: "ACCESORIES",
                    brand: "Rascals",
                    size: "UNIQUE",
                    active: true,
                },
                {
                    id: "74",
                    name: "Alimento Excellent Gato Sterilized Pollo - 7,5 Kg",
                    price: 10105,
                    displayPrice: 11000,
                    description: "El Alimento Excellent Gato Sterilized Pollo está especialmente diseñado para satisfacer las necesidades nutricionales específicas de los gatos castrados. Además, ofrece una combinación de ingredientes adecuada para que tu gato tenga una condición corporal ideal, ayudando en el control de bolas de pelo y manteniendo un tracto urinario saludable.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/184564-1000-1000/150067.png?v=637750189284800000",
                    category: "FOOD",
                    brand: "Excellent",
                    size: "UNIQUE",
                    active: true,
                },
                {
                    id: "75",
                    name: "Pro Plan Kitten Protection - 3 Kg",
                    price: 7000,
                    displayPrice: 7200,
                    description: "Alimento balanceado para gatos en crecimiento de hasta 12 meses de edad y hembras gestantes o lactantes. Formulado con una mezcla innovadora de nutrientes, como el calostro rico en anticuerpos naturales. Esta mezcla única ayuda a extender la protección que empezó con la leche materna, reforzando la salud intestinal del gatito y ayudando a reducir el riesgo de trastornos digestivos.",
                    stock: 100,
                    photo: "https://puppis.vteximg.com.br/arquivos/ids/179624-1000-1000/7613039784914_2.png?v=637570859712630000",
                    category: "FOOD",
                    brand: "Pro Plan",
                    size: "UNIQUE",
                    active: true,
                }
            ]
        })
        await prisma.review.createMany({
                data: [
                    {    
                        rating: 5,
                        review: "Es muy bueno y resistente, perfecto para mascotas juguetonas",
                        productId: "1",
                        userId: "7"
                    },
                    {    
                        rating: 2,
                        review: "La verdad no era lo que esperaba, se daño muy rapido y es mas pequeño de lo que muestran",
                        productId: "1",
                        userId: "10"
                    },
                    {    
                        rating: 5,
                        review: "Es muy bueno y resistente, perfecto para mascotas juguetonas",
                        productId: "2",
                        userId: "1"
                    },
                    {    
                        rating: 2,
                        review: "La verdad no era lo que esperaba, se daño muy rapido y es mas pequeño de lo que muestran",
                        productId: "2",
                        userId: "5"
                    },
                    {    
                        rating: 5,
                        review: "Es muy bueno y resistente, perfecto para mascotas juguetonas",
                        productId: "3",
                        userId: "9"
                    },
                    {    
                        rating: 2,
                        review: "La verdad no era lo que esperaba, se daño muy rapido y es mas pequeño de lo que muestran",
                        productId: "3",
                        userId: "7"
                    },
                    {    
                        rating: 5,
                        review: "Es muy bueno y resistente, perfecto para mascotas juguetonas",
                        productId: "3",
                        userId: "3"
                    },
                    {    
                        rating: 2,
                        review: "La verdad no era lo que esperaba, se daño muy rapido y es mas pequeño de lo que muestran",
                        productId: "3",
                        userId: "16"
                    },
                    {    
                        rating: 5,
                        review: "Es muy bueno y resistente, perfecto para mascotas juguetonas",
                        productId: "4",
                        userId: "7"
                    },
                    {    
                        rating: 2,
                        review: "La verdad no era lo que esperaba, se daño muy rapido y es mas pequeño de lo que muestran",
                        productId: "4",
                        userId: "10"
                    },
                    {    
                        rating: 5,
                        review: "Es un muy buen producto, cumple todo lo que promete",
                        productId: "5",
                        userId: "20"
                    },
                    {    
                        rating: 3,
                        review: "Esta muy regular, la verdad esperaba mas de acuerdo a lo que vi en las fotos",
                        productId: "5",
                        userId: "11"
                    },
                    {    
                        rating: 5,
                        review: "Es un muy buen producto, cumple todo lo que promete",
                        productId: "6",
                        userId: "14"
                    },
                    {    
                        rating: 3,
                        review: "Esta muy regular, la verdad esperaba mas de acuerdo a lo que vi en las fotos",
                        productId: "6",
                        userId: "9"
                    },
                    {    
                        rating: 5,
                        review: "Es un muy buen producto, cumple todo lo que promete",
                        productId: "7",
                        userId: "4"
                    },
                    {    
                        rating: 3,
                        review: "Esta muy regular, la verdad esperaba mas de acuerdo a lo que vi en las fotos",
                        productId: "7",
                        userId: "8"
                    },
                    {    
                        rating: 5,
                        review: "Es un muy buen producto, cumple todo lo que promete",
                        productId: "8",
                        userId: "14"
                    },
                    {    
                        rating: 3,
                        review: "Esta muy regular, la verdad esperaba mas de acuerdo a lo que vi en las fotos",
                        productId: "8",
                        userId: "9"
                    },
                    {    
                        rating: 5,
                        review: "Es un muy buen producto, cumple todo lo que promete",
                        productId: "7",
                        userId: "14"
                    },
                    {    
                        rating: 3,
                        review: "Esta muy regular, la verdad esperaba mas de acuerdo a lo que vi en las fotos",
                        productId: "7",
                        userId: "9"
                    },                    
                    //
                    {    
                        rating: 5,
                        review: "Es muy bueno y resistente, perfecto para mascotas juguetonas",
                        productId: "9",
                        userId: "7"
                    },
                    {    
                        rating: 2,
                        review: "La verdad no era lo que esperaba, se daño muy rapido y es mas pequeño de lo que muestran",
                        productId: "9",
                        userId: "10"
                    },
                    {    
                        rating: 5,
                        review: "Es muy bueno y resistente, perfecto para mascotas juguetonas",
                        productId: "10",
                        userId: "1"
                    },
                    {    
                        rating: 2,
                        review: "La verdad no era lo que esperaba, se daño muy rapido y es mas pequeño de lo que muestran",
                        productId: "10",
                        userId: "5"
                    },
                    {    
                        rating: 5,
                        review: "Es muy bueno y resistente, perfecto para mascotas juguetonas",
                        productId: "11",
                        userId: "9"
                    },
                    {    
                        rating: 2,
                        review: "La verdad no era lo que esperaba, se daño muy rapido y es mas pequeño de lo que muestran",
                        productId: "11",
                        userId: "7"
                    },
                    {    
                        rating: 5,
                        review: "Es muy bueno y resistente, perfecto para mascotas juguetonas",
                        productId: "12",
                        userId: "3"
                    },
                    {    
                        rating: 2,
                        review: "La verdad no era lo que esperaba, se daño muy rapido y es mas pequeño de lo que muestran",
                        productId: "12",
                        userId: "16"
                    },
                    {    
                        rating: 5,
                        review: "Es muy bueno y resistente, perfecto para mascotas juguetonas",
                        productId: "13",
                        userId: "7"
                    },
                    {    
                        rating: 2,
                        review: "La verdad no era lo que esperaba, se daño muy rapido y es mas pequeño de lo que muestran",
                        productId: "13",
                        userId: "10"
                    },
                    {    
                        rating: 5,
                        review: "Es un muy buen producto, cumple todo lo que promete",
                        productId: "14",
                        userId: "20"
                    },
                    {    
                        rating: 3,
                        review: "Esta muy regular, la verdad esperaba mas de acuerdo a lo que vi en las fotos",
                        productId: "14",
                        userId: "11"
                    },
                    {    
                        rating: 5,
                        review: "Es un muy buen producto, cumple todo lo que promete",
                        productId: "15",
                        userId: "14"
                    },
                    {    
                        rating: 3,
                        review: "Esta muy regular, la verdad esperaba mas de acuerdo a lo que vi en las fotos",
                        productId: "15",
                        userId: "9"
                    },
                    {    
                        rating: 5,
                        review: "Es un muy buen producto, cumple todo lo que promete",
                        productId: "16",
                        userId: "4"
                    },
                    {    
                        rating: 3,
                        review: "Esta muy regular, la verdad esperaba mas de acuerdo a lo que vi en las fotos",
                        productId: "16",
                        userId: "8"
                    },
                    {    
                        rating: 5,
                        review: "Es un muy buen producto, cumple todo lo que promete",
                        productId: "17",
                        userId: "14"
                    },
                    {    
                        rating: 3,
                        review: "Esta muy regular, la verdad esperaba mas de acuerdo a lo que vi en las fotos",
                        productId: "17",
                        userId: "9"
                    },
                    {    
                        rating: 5,
                        review: "Es un muy buen producto, cumple todo lo que promete",
                        productId: "18",
                        userId: "14"
                    },
                    {    
                        rating: 3,
                        review: "Esta muy regular, la verdad esperaba mas de acuerdo a lo que vi en las fotos",
                        productId: "18",
                        userId: "9"
                    },
                    {    
                        rating: 5,
                        review: "Es un muy buen producto, cumple todo lo que promete",
                        productId: "19",
                        userId: "14"
                    },
                    {    
                        rating: 3,
                        review: "Esta muy regular, la verdad esperaba mas de acuerdo a lo que vi en las fotos",
                        productId: "19",
                        userId: "9"
                    },
                    //
                    {    
                        rating: 5,
                        review: "Es muy bueno y resistente, perfecto para mascotas juguetonas",
                        productId: "20",
                        userId: "1"
                    },
                    {    
                        rating: 2,
                        review: "La verdad no era lo que esperaba, se daño muy rapido y es mas pequeño de lo que muestran",
                        productId: "21",
                        userId: "5"
                    },
                    {    
                        rating: 5,
                        review: "Es muy bueno y resistente, perfecto para mascotas juguetonas",
                        productId: "22",
                        userId: "9"
                    },
                    {    
                        rating: 2,
                        review: "La verdad no era lo que esperaba, se daño muy rapido y es mas pequeño de lo que muestran",
                        productId: "23",
                        userId: "7"
                    },
                    {    
                        rating: 5,
                        review: "Es muy bueno y resistente, perfecto para mascotas juguetonas",
                        productId: "23",
                        userId: "3"
                    },
                    {    
                        rating: 2,
                        review: "La verdad no era lo que esperaba, se daño muy rapido y es mas pequeño de lo que muestran",
                        productId: "24",
                        userId: "16"
                    },
                    {    
                        rating: 5,
                        review: "Es muy bueno y resistente, perfecto para mascotas juguetonas",
                        productId: "24",
                        userId: "7"
                    },
                    {    
                        rating: 2,
                        review: "La verdad no era lo que esperaba, se daño muy rapido y es mas pequeño de lo que muestran",
                        productId: "25",
                        userId: "10"
                    },
                    {    
                        rating: 5,
                        review: "Es un muy buen producto, cumple todo lo que promete",
                        productId: "25",
                        userId: "20"
                    },
                    {    
                        rating: 3,
                        review: "Esta muy regular, la verdad esperaba mas de acuerdo a lo que vi en las fotos",
                        productId: "26",
                        userId: "11"
                    },
                    {    
                        rating: 5,
                        review: "Es un muy buen producto, cumple todo lo que promete",
                        productId: "27",
                        userId: "14"
                    },
                    {    
                        rating: 3,
                        review: "Esta muy regular, la verdad esperaba mas de acuerdo a lo que vi en las fotos",
                        productId: "28",
                        userId: "9"
                    },
                    {    
                        rating: 5,
                        review: "Es un muy buen producto, cumple todo lo que promete",
                        productId: "29",
                        userId: "4"
                    },
                    {    
                        rating: 3,
                        review: "Esta muy regular, la verdad esperaba mas de acuerdo a lo que vi en las fotos",
                        productId: "29",
                        userId: "8"
                    },
                    {    
                        rating: 5,
                        review: "Es un muy buen producto, cumple todo lo que promete",
                        productId: "30",
                        userId: "14"
                    },
                    {    
                        rating: 3,
                        review: "Esta muy regular, la verdad esperaba mas de acuerdo a lo que vi en las fotos",
                        productId: "30",
                        userId: "9"
                    },
                    {    
                        rating: 5,
                        review: "Es un muy buen producto, cumple todo lo que promete",
                        productId: "31",
                        userId: "14"
                    },
                    {    
                        rating: 3,
                        review: "Esta muy regular, la verdad esperaba mas de acuerdo a lo que vi en las fotos",
                        productId: "31",
                        userId: "9"
                    },
                    {    
                        rating: 5,
                        review: "Es un muy buen producto, cumple todo lo que promete",
                        productId: "32",
                        userId: "14"
                    },
                    {    
                        rating: 3,
                        review: "Esta muy regular, la verdad esperaba mas de acuerdo a lo que vi en las fotos",
                        productId: "32",
                        userId: "9"
                    },
                    //
                    {    
                        rating: 2,
                        review: "La verdad no era lo que esperaba, se daño muy rapido y es mas pequeño de lo que muestran",
                        productId: "35",
                        userId: "10"
                    },
                    {    
                        rating: 5,
                        review: "Es muy bueno y resistente, perfecto para mascotas juguetonas",
                        productId: "35",
                        userId: "1"
                    },
                    {    
                        rating: 2,
                        review: "La verdad no era lo que esperaba, se daño muy rapido y es mas pequeño de lo que muestran",
                        productId: "34",
                        userId: "5"
                    },
                    {    
                        rating: 5,
                        review: "Es muy bueno y resistente, perfecto para mascotas juguetonas",
                        productId: "35",
                        userId: "9"
                    },
                    {    
                        rating: 2,
                        review: "La verdad no era lo que esperaba, se daño muy rapido y es mas pequeño de lo que muestran",
                        productId: "35",
                        userId: "7"
                    },
                    {    
                        rating: 5,
                        review: "Es muy bueno y resistente, perfecto para mascotas juguetonas",
                        productId: "36",
                        userId: "3"
                    },
                    {    
                        rating: 2,
                        review: "La verdad no era lo que esperaba, se daño muy rapido y es mas pequeño de lo que muestran",
                        productId: "36",
                        userId: "16"
                    },
                    {    
                        rating: 5,
                        review: "Es muy bueno y resistente, perfecto para mascotas juguetonas",
                        productId: "37",
                        userId: "7"
                    },
                    {    
                        rating: 2,
                        review: "La verdad no era lo que esperaba, se daño muy rapido y es mas pequeño de lo que muestran",
                        productId: "37",
                        userId: "10"
                    },
                    {    
                        rating: 5,
                        review: "Es un muy buen producto, cumple todo lo que promete",
                        productId: "38",
                        userId: "20"
                    },
                    {    
                        rating: 3,
                        review: "Esta muy regular, la verdad esperaba mas de acuerdo a lo que vi en las fotos",
                        productId: "38",
                        userId: "11"
                    },
                    {    
                        rating: 5,
                        review: "Es un muy buen producto, cumple todo lo que promete",
                        productId: "39",
                        userId: "14"
                    },
                    {    
                        rating: 3,
                        review: "Esta muy regular, la verdad esperaba mas de acuerdo a lo que vi en las fotos",
                        productId: "39",
                        userId: "9"
                    },
                    {    
                        rating: 5,
                        review: "Es un muy buen producto, cumple todo lo que promete",
                        productId: "40",
                        userId: "4"
                    },
                    {    
                        rating: 3,
                        review: "Esta muy regular, la verdad esperaba mas de acuerdo a lo que vi en las fotos",
                        productId: "40",
                        userId: "8"
                    },
                    {    
                        rating: 5,
                        review: "Es un muy buen producto, cumple todo lo que promete",
                        productId: "41",
                        userId: "14"
                    },
                    {    
                        rating: 3,
                        review: "Esta muy regular, la verdad esperaba mas de acuerdo a lo que vi en las fotos",
                        productId: "41",
                        userId: "9"
                    },
                    {    
                        rating: 5,
                        review: "Es un muy buen producto, cumple todo lo que promete",
                        productId: "42",
                        userId: "14"
                    },
                    {    
                        rating: 3,
                        review: "Esta muy regular, la verdad esperaba mas de acuerdo a lo que vi en las fotos",
                        productId: "42",
                        userId: "9"
                    },
                    {    
                        rating: 5,
                        review: "Es un muy buen producto, cumple todo lo que promete",
                        productId: "43",
                        userId: "14"
                    },
                    {    
                        rating: 3,
                        review: "Esta muy regular, la verdad esperaba mas de acuerdo a lo que vi en las fotos",
                        productId: "43",
                        userId: "9"
                    },
                    //
                    {    
                        rating: 5,
                        review: "Es muy bueno y resistente, perfecto para mascotas juguetonas",
                        productId: "44",
                        userId: "1"
                    },
                    {    
                        rating: 2,
                        review: "La verdad no era lo que esperaba, se daño muy rapido y es mas pequeño de lo que muestran",
                        productId: "44",
                        userId: "5"
                    },
                    {    
                        rating: 5,
                        review: "Es muy bueno y resistente, perfecto para mascotas juguetonas",
                        productId: "45",
                        userId: "9"
                    },
                    {    
                        rating: 2,
                        review: "La verdad no era lo que esperaba, se daño muy rapido y es mas pequeño de lo que muestran",
                        productId: "45",
                        userId: "7"
                    },
                    {    
                        rating: 5,
                        review: "Es muy bueno y resistente, perfecto para mascotas juguetonas",
                        productId: "46",
                        userId: "3"
                    },
                    {    
                        rating: 2,
                        review: "La verdad no era lo que esperaba, se daño muy rapido y es mas pequeño de lo que muestran",
                        productId: "46",
                        userId: "16"
                    },
                    {    
                        rating: 5,
                        review: "Es muy bueno y resistente, perfecto para mascotas juguetonas",
                        productId: "47",
                        userId: "7"
                    },
                    {    
                        rating: 2,
                        review: "La verdad no era lo que esperaba, se daño muy rapido y es mas pequeño de lo que muestran",
                        productId: "47",
                        userId: "10"
                    },
                    {    
                        rating: 5,
                        review: "Es un muy buen producto, cumple todo lo que promete",
                        productId: "48",
                        userId: "20"
                    },
                    {    
                        rating: 3,
                        review: "Esta muy regular, la verdad esperaba mas de acuerdo a lo que vi en las fotos",
                        productId: "48",
                        userId: "11"
                    },
                    {    
                        rating: 5,
                        review: "Es un muy buen producto, cumple todo lo que promete",
                        productId: "49",
                        userId: "14"
                    },
                    {    
                        rating: 3,
                        review: "Esta muy regular, la verdad esperaba mas de acuerdo a lo que vi en las fotos",
                        productId: "49",
                        userId: "9"
                    },
                    {    
                        rating: 5,
                        review: "Es un muy buen producto, cumple todo lo que promete",
                        productId: "50",
                        userId: "4"
                    },
                    {    
                        rating: 3,
                        review: "Esta muy regular, la verdad esperaba mas de acuerdo a lo que vi en las fotos",
                        productId: "50",
                        userId: "8"
                    },
                    {    
                        rating: 5,
                        review: "Es un muy buen producto, cumple todo lo que promete",
                        productId: "51",
                        userId: "14"
                    },
                    {    
                        rating: 3,
                        review: "Esta muy regular, la verdad esperaba mas de acuerdo a lo que vi en las fotos",
                        productId: "51",
                        userId: "9"
                    },
                    {    
                        rating: 5,
                        review: "Es un muy buen producto, cumple todo lo que promete",
                        productId: "52",
                        userId: "14"
                    },
                    {    
                        rating: 3,
                        review: "Esta muy regular, la verdad esperaba mas de acuerdo a lo que vi en las fotos",
                        productId: "52",
                        userId: "9"
                    },
                    {    
                        rating: 5,
                        review: "Es un muy buen producto, cumple todo lo que promete",
                        productId: "53",
                        userId: "14"
                    },
                    {    
                        rating: 3,
                        review: "Esta muy regular, la verdad esperaba mas de acuerdo a lo que vi en las fotos",
                        productId: "53",
                        userId: "9"
                    },
                ]
            })
    
            await prisma.transaction.create({
                data: {
                    createdAt: "2022-12-08T03:08:45.700Z",
                    amount: 13000,
                    userId: '1',
                    quantity: {
                        create: [
                            { quantity: 10, productId: "1" },
                        ]
                    }
    
                }
            })
            await prisma.transaction.create({
                data: {
                    createdAt: "2022-11-08T03:08:45.700Z",
                    amount: 15000,
                    userId: '2',
                    quantity: {
                        create: [
                            { quantity: 10, productId: "2" },
    
                        ]
                    }
    
                }
            })
            await prisma.transaction.create({
                data: {
                    amount: 13550,
                    userId: '3',
                    quantity: {
                        create: [
                            { quantity: 10, productId: "3" },
    
                        ]
                    }
    
                }
            })
            await prisma.transaction.create({
                data: {
                    createdAt: "2022-10-08T03:08:45.700Z",
                    amount: 155000,
                    userId: '4',
                    quantity: {
                        create: [
                            { quantity: 10, productId: "6" },
    
                        ]
                    }
    
                }
            })
            await prisma.transaction.create({
                data: {
                    createdAt: "2022-09-08T03:08:45.700Z",
                    amount: 96200,
                    userId: '4',
                    quantity: {
                        create: [
                            { quantity: 10, productId: "7" }
    
                        ]
                    }
    
                }
            })
            await prisma.transaction.create({
                data: {
                    createdAt: "2022-08-08T03:08:45.700Z",
                    amount: 125550,
                    userId: '4',
                    quantity: {
                        create: [
                            { quantity: 10, productId: "9" }
                        ]
                    }
    
                }
            })
            await prisma.transaction.create({
                data: {
                    createdAt: "2022-07-08T03:08:45.700Z",
                    amount: 43550,
                    userId: '4',
                    quantity: {
                        create: [
                            { quantity: 10, productId: "10" }
    
                        ]
                    }
    
                }
            })
            await prisma.transaction.create({
                data: {
                    createdAt: "2022-06-08T03:08:45.700Z",
                    amount: 166050,
                    userId: '4',
                    quantity: {
                        create: [
                            { quantity: 10, productId: "11" }
    
                        ]
                    }
    
                }
            })
            await prisma.transaction.create({
                data: {
                    createdAt: "2022-05-08T03:08:45.700Z",
                    amount: 158550,
                    userId: '4',
                    quantity: {
                        create: [
                            { quantity: 10, productId: "12" }
    
                        ]
                    }
    
                }
            })
            await prisma.transaction.create({
                data: {
                    createdAt: "2022-04-08T03:08:45.700Z",
                    amount: 9550,
                    userId: '4',
                    quantity: {
                        create: [
                            { quantity: 10, productId: "18" }
                        ]
                    }
    
                }
            })
            await prisma.transaction.create({
                data: {
                    createdAt: "2022-03-08T03:08:45.700Z",
                    amount: 36550,
                    userId: '4',
                    quantity: {
                        create: [
                            { quantity: 10, productId: "19" }
                        ]
                    }
    
                }
            })
            await prisma.transaction.create({
                data: {
                    createdAt: "2022-02-08T03:08:45.700Z",
                    amount: 18550,
                    userId: '4',
                    quantity: {
                        create: [
                            { quantity: 10, productId: "20" }
                        ]
                    }
    
                }
            })
            await prisma.transaction.create({
                data: {
                    createdAt: "2022-01-08T03:08:45.700Z",
                    amount: 23550,
                    userId: '4',
                    quantity: {
                        create: [
                            { quantity: 10, productId: "21" }
                        ]
                    }
    
                }
            })
            await prisma.transaction.create({
                data: {
    
                    amount: 3550,
                    userId: '4',
                    quantity: {
                        create: [
                            { quantity: 10, productId: "17" }
                        ]
                    }
    
                }
            })
            await prisma.transaction.create({
                data: {
    
                    amount: 9750,
                    userId: '4',
                    quantity: {
                        create: [
                            { quantity: 10, productId: "15" }
                        ]
                    }
    
                }
            })
            await prisma.transaction.create({
                data: {
    
                    amount: 158550,
                    userId: '4',
                    quantity: {
                        create: [
                            { quantity: 10, productId: "12" }
                        ]
                    }
    
                }
            })
            await prisma.transaction.create({
                data: {
    
                    amount: 21500,
                    userId: '4',
                    quantity: {
                        create: [
                            { quantity: 5, productId: "10" }
                        ]
                    }
    
                }
            })
            await prisma.transaction.create({
                data: {
    
                    amount: 30000,
                    userId: '6',
                    quantity: {
                        create: [
                            { quantity: 20, productId: "2" }
                        ]
                    }
    
                }
            })
     

    } catch (error) {
        console.log(error)
    }

}
