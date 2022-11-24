import { prisma } from "./lib/prisma";

export default async function createDB() {


    try {
        await prisma.user.createMany({
            data: [
                {
                    id: "1",
                    name: "damian",
                    lastName: "aguirre",
                    email: "damian_aguirre@test.com",
                    birthday: "19-02-1989",
                    role: "ADMIN",
                    password: "passtest01",
                    photo: "https://img.freepik.com/foto-gratis/retrato-hombre-blanco-aislado_53876-40306.jpg?w=2000"
                },
                {
                    id: "2",
                    name: "rosa",
                    lastName: "mercedes",
                    email: "rosa_mercedes@test.com",
                    birthday: "19-02-1990",
                    role: "BASIC",
                    password: "passtest02",
                    photo: "https://img.freepik.com/fotos-premium/mujer-cara-bonita_144962-1367.jpg?w=2000"
                },
                {
                    id: "3",
                    name: "carina",
                    lastName: "marra",
                    email: "carina_marra@test.com",
                    birthday: "19-02-1985",
                    role: "PROFESSIONAL",
                    password: "passtest03",
                    photo: "https://img.freepik.com/foto-gratis/joven-mujer-caucasica-feliz-desnuda_144627-1275.jpg?w=2000"
                },
                {
                    id: "4",
                    name: "rodri",
                    lastName: "kas",
                    email: "rodri_kas@test.com",
                    birthday: "19-02-1955",
                    role: "PROFESSIONAL",
                    password: "passtest03",
                    photo: "https://img.freepik.com/foto-gratis/joven-mujer-caucasica-feliz-desnuda_144627-1275.jpg?w=2000"
                },
                {
                    id: "5",
                    name: "carlos",
                    lastName: "right",
                    email: "carlos_right@test.com",
                    birthday: "19-02-1985",
                    role: "PROFESSIONAL",
                    password: "passtest03",
                    photo: "https://img.freepik.com/foto-gratis/joven-mujer-caucasica-feliz-desnuda_144627-1275.jpg?w=2000"
                },
                {
                    id: "6",
                    name: "adriana",
                    lastName: "lasa",
                    email: "adriana-lasa@test.com",
                    birthday: "19-02-1995",
                    role: "PROFESSIONAL",
                    password: "passtest03",
                    photo: "https://img.freepik.com/foto-gratis/joven-mujer-caucasica-feliz-desnuda_144627-1275.jpg?w=2000"
                }
            ]
        })

        await prisma.adoptionPost.createMany({
            data: [
                {
                    id: "1",
                    name: "rayito",
                    size: "SMALL",
                    age: "un año",
                    breed: "ave",
                    photo: "https://img.freepik.com/foto-gratis/loro-color-muy-bonito-posado-rama-arbol_493961-1289.jpg?w=2000",
                    active: true,
                    userAdopId: "1"
                },
                {
                    id: "2",
                    name: "meteoro",
                    size: "BIG",
                    age: "5 años",
                    breed: "tortuga",
                    photo: "https://img.freepik.com/foto-gratis/tortuga-estimulada-africana-hierba_167946-113.jpg?w=2000",
                    active: true,
                    userAdopId: "2"
                },
                {
                    id: "3",
                    name: "caos",
                    size: "SMALL",
                    age: "3 años",
                    breed: "tortuga",
                    photo: "https://img.freepik.com/fotos-premium/tortuga-sucata-suelo_41969-10112.jpg?w=2000",
                    active: true,
                    userAdopId: "3"
                },
                {
                    id: "4",
                    name: "roberto",
                    size: "MEDIUM",
                    age: "2 meses",
                    breed: "gato",
                    photo: "https://img.freepik.com/fotos-premium/lindo-gatito-gris-amarillo-ve-juega-negocios-copyspace_89381-2435.jpg?w=2000",
                    active: true,
                    userAdopId: "4"
                },
                {
                    id: "5",
                    name: "no tiene",
                    size: "SMALL",
                    age: "3 meses",
                    breed: "perro",
                    photo: "https://img.freepik.com/free-photo/shallow-focus-shot-cute-golden-retriever-puppy-sitting-grass-ground_181624-24655.jpg?w=2000",
                    active: true,
                    userAdopId: "5"
                },
                {
                    id: "6",
                    name: "camilo",
                    size: "MEDIUM",
                    age: "5 meses",
                    breed: "gato",
                    photo: "https://img.freepik.com/fotos-premium/hermoso-gato-ojos-azules_58409-14525.jpg?w=2000",
                    active: true,
                    userAdopId: "4"
                },
                {
                    id: "7",
                    name: "no tiene",
                    size: "BIG",
                    age: "2 meses",
                    breed: "perro",
                    photo: "https://img.freepik.com/foto-gratis/lindo-perro-pastor-posando-aislado-sobre-fondo-blanco_155003-46179.jpg?w=2000",
                    active: true,
                    userAdopId: "4"
                },
                {
                    id: "8",
                    name: "leo",
                    size: "MEDIUM",
                    age: "5 meses",
                    breed: "perro",
                    photo: "https://img.freepik.com/fotos-premium/primer-plano-perro-raza-mixta-jadeando_191971-7459.jpg?w=2000",
                    active: true,
                    userAdopId: "5"
                }
                ,
                {
                    id: "9",
                    name: "sin nombre",
                    size: "BIG",
                    age: "3 meses",
                    breed: "perro",
                    photo: "https://img.freepik.com/fotos-premium/foto-vertical-cachorro-labrador-marron-cachorro-pequeno-expresion-adulta-dulce-perrito_106652-1123.jpg?w=2000",
                    active: true,
                    userAdopId: "5"
                }
                ,
                {
                    id: "10",
                    name: "rafa",
                    size: "SMALL",
                    age: "1 año",
                    breed: "gato",
                    photo: "https://img.freepik.com/foto-gratis/cerrar-propietario-sosteniendo-lindo-gato_23-2149339568.jpg?w=2000",
                    active: true,
                    userAdopId: "6"
                }
                ,
                {
                    id: "11",
                    name: "sin nombre",
                    size: "SMALL",
                    age: "5 meses",
                    breed: "gato",
                    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8vdq8XcrUFKWHTzBfK2taLeiumVdfWqy5KQ&usqp=CAU",
                    active: true,
                    userAdopId: "6"
                }
                ,
                {
                    id: "12",
                    name: "michifus",
                    size: "SMALL",
                    age: "6 meses",
                    breed: "gato",
                    photo: "https://img.freepik.com/foto-gratis/gatito_658691-474.jpg?w=2000",
                    active: true,
                    userAdopId: "6"
                }
            ]
        })
        await prisma.professionalBusiness.createMany({
            data: [
                {
                    id: "1",
                    businessName: "Veterinaria pancitas",
                    contact: "321534564",
                    address: "cl 26 a 5 74 ",
                    description: "veterinaria con mas de 10 años de experiencia",
                    photo: "https://img.freepik.com/vector-premium/profesion-veterinaria-estilo-diseno-plano_180868-1407.jpg?w=2000",
                    dni: "1231387489",
                    type: "VETERINARY",
                    qualification: 4.0,
                    active: true,
                    ownerBusinessId: "3"
                },
                {
                    id: "2",
                    businessName: "Tienda patitas",
                    contact: "3215344474564",
                    address: "cra 426 a 5 74 ",
                    description: "tienda de comida para mascota",
                    photo: "https://img.freepik.com/vector-premium/tienda-mascotas-veterinaria-comida-perros_24877-61100.jpg?w=2000",
                    dni: "4587489",
                    type: "SELLER",
                    qualification: 4.5,
                    active: true,
                    ownerBusinessId: "6"
                },
                {
                    id: "3",
                    businessName: "Cuidador de mascotas Janna Ruiz",
                    contact: "3215454734564",
                    address: "cl 284786 a 5 74 ",
                    description: "5 años de experiencia en cuidado animal",
                    photo: "https://img.freepik.com/vector-premium/cuidador-perros-o-voluntariado-mascotas-ilustracion-vector-servicio-pasear-perros_131590-418.jpg?w=2000",
                    dni: "1237489",
                    type: "KEEPER",
                    qualification: 5.0,
                    active: true,
                    ownerBusinessId: "4"
                },
                {
                    id: "4",
                    businessName: "Tienda patitas",
                    contact: "3215344474564",
                    address: "cra 426 a 5 74 ",
                    description: "tienda de comida para mascota",
                    photo: "https://img.freepik.com/vector-premium/tienda-mascotas-fachada-exteriortienda-mascotas-edificio-tienda-banner-brillante-diseno-fachada-frontal_153905-111.jpg?w=2000",
                    dni: "4546489",
                    type: "SELLER",
                    qualification: 4.5,
                    active: true,
                    ownerBusinessId: "5"
                }
            ]
        })
        await prisma.item.createMany({
            data: [
                {
                    id: "1",
                    name: "ball",
                    price: 30,
                    description: "ball toy for dogs",
                    amount: 4,
                    photo: "https://img.freepik.com/vector-gratis/vector-aislado-balon-futbol-realista-sobre-blanco_1284-41932.jpg",
                    active: true
                },
                {
                    id: "2",
                    name: "bone",
                    price: 80,
                    description: "plastic bone toy for dogs",
                    amount: 3,
                    photo: "https://img.freepik.com/free-vector/floating-bone-dog-food-cartoon-vector-icon-illustration-animal-food-icon-concept-isolated-premium_138676-4762.jpg?w=2000",
                    active: true
                },

                {
                    id: "3",
                    name: "shower",
                    price: 120,
                    description: "shower for the pet",
                    amount: 1,
                    photo: "https://img.freepik.com/fotos-premium/perro-bano-jack-rusl-pet-nadando-comedero-sobre-fondo-azul-alrededor-burbujas-jabon-volador_361821-1683.jpg?w=2000",
                    active: true
                },
            ]
        })
    } catch (error) {
        console.log(error)
    }

}