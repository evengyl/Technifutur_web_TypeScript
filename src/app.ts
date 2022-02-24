
/*###########################################################
#                                                           #
#--------------------Partie installation et démarage--------#
#                                                           #
#############################################################*/
/*Installer node js en lts, 
npm install -g typescript
npx (permet de lancé des package directement depuis la console)
npx tsc --watch permet de lancer le compilateur directement avec en lisant le fichier tsconfig.json à la racine du projet
le fichier tsconfig.json permet de configurer des options de compilation, exemple
{
    "compilerOptions": {
        "outDir": "dist",
        "target": "ES2015", //es3, es5, es6/es2015, es2016, es2017, es2018, es2019, es2020, es2021, or esnext
        "noEmitOnError": true,
        "strict": true
    }  ,
    "files": [
        "src/app.ts"
    ]
}
-> compilerOptions, objet de props pour la compilation voir -> https://www.typescriptlang.org/docs/handbook/compiler-options.html
-> outDir -> dossier de finaliter de compilation
-> target -> permet de définir la version de js visée lors de la compilation
-> noEmitOnError -> permet de dire si true que le code ne dois pas compiler en cas d'erreur
-> strict -> utilise la version strict de TS
-> files [] -> permet de dire au compilateur qu'il dois aller lire dans le dossier le fichier src.app.ts pour compiler

*/

/*###########################################################
#                                                           #
#--------------------Partie sur le Typage ------------------#
#                                                           #
#############################################################*/
/*
const a : string = "Bonjour à tous"
const b : number = 42
const c : boolean = true
const d : null = null
const e : string[] = ["tutu", "tata", "toto"]
const f : any[] = ["tutu", {}, true, 42]
const g : {firstname : string, lastname : string} = {firstname : "loic", lastname : "baudoux"}
const h : {[key : string] : string} = {firstname : "loic", lastname : "baudoux"}
const i : Date = new Date()

const j : Function = (e : MouseEvent) : void => {

}
const k : (e : MouseEvent) => void  = (e : MouseEvent) : void => {

}
//attention que le type de retour void, peux avoir un return, mais il ne pourra pas être utilisé plus tard, donc erreur


//on peux utiliser les variable de chaine, comme litéral, qui pourrais être utilisé comme clé et non seulement comme chaine
// ps : on peux également le faire avec autre chsoe que des chaines
const l = "firstname"
//const l :string = "firstname"
console.log(g[l])


//on peux pousser le typage plus loins, en précisant par exemple, c'est ce qu'on appel l'assertion de type
const compteur = document.querySelector("#compteur")   //type Element | null
//ici on peux voir que compteur est de type Element ou null, c'est ce qu'on appel l'union, on peux le faire pour tout, exemple en dfessous
//const compteur = document.querySelector("#compteur") as HTMLButtonElement // type HTMLButtonElement
//ou -> mais ce sont les générics, seront aborder plus tard
//const compteur = <HTMLButtonElement>document.querySelector("#compteur") // type HTMLButtonElement
const increment = (e : string | number) => {
//    compteur.querySelector('span').innerText = i.toString()
}

*/


/*###########################################################
#                                                           #
#--------------------Exos 1 - le Typage --------------------#
#                                                           #
#############################################################*/

//Créer un code permettant de créer un compteur classique, avec + 1, -1 et =..., il faudra type le tout au maximum, préparer 2 fonctions pour ça
/*
const btnPlus : HTMLButtonElement | null = document.querySelector("#compteurP")
const btnMoins : HTMLButtonElement | null  = document.querySelector("#compteurM")
const total : HTMLSpanElement | null = document.querySelector("#total")
let actual : number

if(total)
    actual = parseInt(total.innerText)

const increment : (e : MouseEvent) => void = (event : MouseEvent) : void=> {
    event.preventDefault()
    actual = actual + 1
    if(total){
        //total //do'ffice un element
        total.innerText = actual.toString()
    }
}
const decrement : (e : MouseEvent) => void = (event : MouseEvent) : void => {
    event.preventDefault()
    actual = actual - 1
    if(total)
        total.innerText = actual.toString()

}


if(btnPlus)
    btnPlus.addEventListener("click", increment)

if(btnMoins)
    btnMoins.addEventListener("click", decrement)
*/




/*###########################################################
#                                                           #
#--------------------Partie Narrowing --------------------#
#                                                           #
#############################################################*/
//-----------ou comment réduire la liste des type disponible---------------



//const total = document.querySelector("#total") //ici, peux être de type Element ou null
//const total = document.querySelector("#total")! //ici, peux être de type Element
//const total = document.querySelector("#total") as HTMLSpanElement //ici, peux être de type HTMLSpanElement
// attention en utilisant ça, car on empèche le code d'être null sur la page ! ce qui apportera son lot d'erreurs,
// il faudra préférer les condition au narrowing forcé comme as et !


//autre exemple
/*
const decrement : (e : MouseEvent) => void = (event : MouseEvent) : void => {
    event.preventDefault()
    const span = document.querySelector<HTMLSpanElement>("#total")
    //actuellement span peux être ou un element ou un null
    //span.innerText = String(42)

    //pour palier au null, on peux simplement le vérifier sur un if, car si null, il passera en else

    if(span)
        span.innerText = String(42)

}
decrement(new MouseEvent('click'))
*/


//autre exemple
/*
function printId(id : string | number) : void{
    if(typeof id === "number")
        console.log((id *42).toString())
    else
        console.log((id + " tututoto").toUpperCase())  //ici il sait directement que id est de type string ! car justement on à éliminer le type number
}
printId("tutu")
*/


//autre exemple
/*
function exemple(a : string | number, b : string | boolean)
{
    if(a === b)
        console.log(a) // ici a sera d'office de type string car c'est le seul type en commun avec b et on à fait une verif de type
}
*/


//autre exemple un poil plus complexe
/*
function exempleInOperator(a : MouseEvent | HTMLInputElement)
{
    if("value" in a)
    {
        a   // ici a est d'office un htmlinputelement car dans l'obj htmlinputelement il y a la prop value et pas dans mouseevent
    }

    if("tututu" in a)
    {
        a // sera de type never, car jamais; MouseEvent et HTMLInputElement ne contiendra de prop tututu non prototyper
    }
}
*/


//Autre exemple pour la gestion des retour, si un type est valable de type date alors retourne tel quel un type date dans a
/*
function isDate(a :any) : a is Date
{
    return a instanceof Date //ici, si a est de type date alors, a est retourner en date
}

function exempleIsDate(a : string | Date | number){
    a = "tutu"
    if(isDate(a)){
        a
    }
}
*/


/*###########################################################
#                                                           #
#--------------------Partie Type custom---------------------#
#                                                           #
#############################################################*/
//on peux également créer nos propre type, comme par exemple


//import * as Users from "./models/Users.model"
//import { Users } from "./models/Users.model"
//import { Users, Admin } from "./models/Users.model"

// import { User, Id, DateString } from "./models/Id.type"
// import { tutu, incrementId } from './models/Id.type'
// type User  = {firstName : string, lastName : string}
// type DateString = string
// type Id = string | number
/*
incrementId()
class User2{
    firstName : string = ""
    lastName : string = ""
}

const a : User = { firstName : "tutu", lastName : "toto"}
const b : DateString = "31-01-2022"
const user_id : Id = 42 //"42"
*/


/*###########################################################
#                                                           #
#--------------------Partie sur les generics----------------#
#                                                           #
#############################################################*/


/*
function identity(arg : any) : any{
    return arg
}

const aa = identity(3)
//on a perdu le type dynamique passé en paramètre a cause du any
// on peux faire ceci

function identity2<T, E>(arg : T) : T{
    return arg
}

const ab = identity2<number, string>(3)
const ac = identity2<string, boolean>("string")
*/
//const ab = identity2(3) // si on l'appel comme tel on a un type de type literal de 3
//const ac = identity2<number>(3) //on passe nous même le type qui sera répercuté dans argtype et utilisé en tant que number
//donc ici on prévois que la function identity2 ne connais pas encore sont type !

//autre exemple avec un tableau
/*
function first<Type>(arg : Type[]) : Type{
    return arg[0]
}
const ad = first(["a", "b", "c"])
*/

//autre exemple avec un array différent
//const ae : Array<string | number> = ["a", "b", 3]


//autre exemple, on peux dire à notre generic que ce qu'il va recevoir en paramètre dois contenir, un objet qui contient une prop 
//length qui elle même est un number

function consoleSize<Type extends {length : number}>(arg : Type) : Type{
    console.log(arg.length)
    return arg
}
const af = consoleSize("tutu")


function gestUsers<T extends { id : number}>(arg : T) : number
{
    console.log(arg.id)
    
    return arg.id
}


import {Users} from './models/Users.model'
let user = new Users()
user = {
    lastName : "Bibi",
    firstName : "toto",
    id : 42
}

const ag = gestUsers(user)
const ah = gestUsers<Users>(user)




/*###########################################################
#                                                           #
#--------------------Exos 2 --------------------------------#
#                                                           #
#############################################################*/
//reprendre le code de l'exos 1 et tranformer le tout avec des narrowing et des generics
