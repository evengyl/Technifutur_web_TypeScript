
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

const a : string = "Bonjour à tous"
const b : number = 42
const c : boolean = true
const d : null = null
const e : string[] = ["tutu", "tata", "toto"]
const f : any[] = ["tutu", {}, true, 42]
const g : {firstname : string, lastname : string} = {firstname : "loic", lastname : "baudoux"}
const h : {[key : string] : string} = {firstname : "loic", lastname : "baudoux"}
let i : Date = new Date()

const j : Function = (e : MouseEvent) : void => {

}
const k : (e : MouseEvent) => void  = (e : MouseEvent) : void => {

}

//attention que le type de retour void, peux avoir un return, mais il ne pourra pas être utilisé plus tard, donc erreur


/*on peux utiliser les variable de chaine, comme litéral, qui pourrais être utilisé comme clé et non seulement comme chaine
ps : on peux également le faire avec autre chsoe que des chaines*/
//const l = "firstname"
/*const l : string = "firstname"
console.log(g[l])*/


//on peux pousser le typage plus loins, en précisant par exemple, c'est ce qu'on appel l'assertion de type
//const compteur = document.querySelector("#compteur")   //type Element | null

//ici on peux voir que compteur est de type Element ou null, c'est ce qu'on appel l'union, on peux le faire pour tout, exemple en dfessous
//const compteur = document.querySelector("#compteur") as HTMLButtonElement // type HTMLButtonElement

//ou -> mais ce sont les générics, seront aborder plus tard

const compteur = <HTMLButtonElement>document.querySelector("#compteur") // type HTMLButtonElement
const increment = (e : string | number) => {
    let compteurSpan = <HTMLSpanElement>compteur.querySelector('span')
    compteurSpan.innerText = i.toString()
}

compteur.addEventListener("click", () => {
    
    increment("e")
})



/*




/*###########################################################
#                                                           #
#--------------------Exos 1 - le Typage --------------------#
#                                                           #
#############################################################*/

//Créer un code permettant de créer un compteur classique, avec + 1, -1 et =..., 
//il faudra type le tout au maximum, préparer 2 fonctions pour ça
/*
const btnPlus : HTMLButtonElement | nul l = document.querySelector("#compteurP")
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
/*
type User  = {firstName : string, lastName : string}
type DateString = string
type Id = string | number

const a : User = { firstName : "tutu", lastName : "toto"}
const b : DateString = "31-01-2022"
const c : Id = 42 //"42"

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

const aa = identity(3)*/
//on a perdu le type dynamique passé en paramètre a cause du any
// on peux faire ceci
/*
function identity2<ArgType>(arg : ArgType) : ArgType{
    return arg
}*/
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
/*
function consoleSize<Type extends {length : number}>(arg : Type) : Type{
    console.log(arg.length)
    return arg
}
const af = consoleSize(['3', 2])
*/




/*###########################################################
#                                                           #
#--------------------Exos 2 --------------------------------#
#                                                           #
#############################################################*/
//reprendre le code de l'exos 1 et tranformer le tout avec des narrowing et des generics

/*
const btnPlus = <HTMLButtonElement>document.querySelector("#compteurP")
const btnMoins = <HTMLButtonElement>document.querySelector("#compteurM")
const total = <HTMLSpanElement>document.querySelector("#total")
let actual = <number>parseInt(total.innerText)

const increment : (e : MouseEvent) => void = (event : MouseEvent) : void=> {
    event.preventDefault()
    actual = actual + 1
    total.innerText = actual.toString()
}


function setActual<ArgType>(nb : ArgType) : number{
    let a = nb as unknown as number
    a = a-1
    return a
}

function decrement(event : Event) : void
{
    event.preventDefault()
    actual = setActual<number>(actual)
    total.innerText = actual.toString()

}



btnPlus?.addEventListener("click", increment)
btnMoins?.addEventListener<keyof HTMLElementEventMap>("click", decrement)
*/



/*###########################################################
#                                                           #
#--------------------Partie sur les classes ----------------#
#                                                           #
#############################################################*/

/*
class Person{
    protected age = 30 //protected signifie qu'il est dispo dans la classe et dans les classe enfant héritée de person !

}


class User extends Person{
    private firstName = "Loïc" //uniquement disponible que dans la class User !
    public lastName = "Baudoux" //par défaut, si on ne le met pas c'est pareil
    

    log() {
        console.log(this.firstName) // seul manière d'y accéder

        console.log(this.age) //je peux y accéder car je suis en extends de person
    }
}


const user = new User()
console.log(user)
//console.log(user.firstName)
console.log(user.lastName)
//console.log(user.age)
user.log()
*/


//attention que si cette pratique, de mettre private et protected marche en ts, elle ne sera pas fonctionel sur le js pure !
// on peux, si on compile vers une version très récente de JS, utilisé # devant les props, qui les rendes vraiment private
/*
class User2{
    #firstName = "Loic"
    #lastName = "Baudoux"
}

const user2 = new User2()
console.log(user2)  //ne permettra de ne rien avoir dans la console !!!
*/

//on peux,  grace au constructeur, rendre la création de props dynamiquement paramétrée
/*
class User{
    constructor(public a : number, public b : string)
    {

    }
}
const user = new User(30, "tutu")
console.log(user)
*/


//on peux également avoir des généric dans les class
/*
class User2<T> { //je dis que user2 sera construit en donnant T comme type
    constructor(private item : T[]){ //le constructeur pourra recevoir un type[]

    }

    first() : T | null{ //first permettra de renvoyer un T ou null
        return this.item[2] || null //renvoi item0 ou null 
    }
}

const user2 = new User2(["tutu", "tata"]) //implicite
// ou 
const user3 = new User2<string>(["titi", "toto"]) //explicite
console.log(user2.first())
console.log(user3.first())
*/

//on peux également, comme dans la plupars des languages de prog OO, retourner l'instance
/*
class User3<T> { //je dis que user2 sera construit en donnant T comme type
    constructor(private item : T[]){ //le constructeur pourra recevoir un type[]

    }

    add(item : T) : this{
        this.item.push(item)
        return this
    }

    first() : T | null{ //first permettra de renvoyer un T ou null
        return this.item[2] || null //renvoi item0 ou null 
    }
    addd = () => {
        //exemple pour montrer que les fonctions flèchée sont légerement différente car apparaisse dans le log ! et pas les autre
        //ps : elle n'ont pas été crée pour faire des fonctions :) mais pour faire des anonyme :)
    }
}
const user4 = new User3(["tete", "toto"])
user4.add("tutu")
console.log(user4)
*/


//atention, typescript à un gros défaut... il travail avec ce qu'on appel le duck typing... exemple
/*
class Point{
    x : number = 0
    y : number = 0
}

class Geometry{
    x : number = 0
    y : number = 0
    other1 : string = "tutu"
    other2 : boolean = false
}

function getX(p : Point) : number { return p.x}
// et j'appel
getX(new Point)
getX(new Geometry)
*/
//on vois que ici on a pas de soucis, car comem dirait l'express, si ça fait coin et que ça marche comme un canard, c'est un canard...
//donc si geometry est une class, comme point, et que geometry possède x et y, comme point, alors geometry est un point


//Comme dans beaucoup de language OO, ts incorpore la notion de abstract, une class abstract est une classe incomplète, 
//elle pourra contenir des methode non implémentée par exemple mais ses enfant devront l'implémenter, 
// attention que les class abstract avec des méthode abstract ne peuvent être instanciée ! exemple :
/*
abstract class Geometry
{
    x! : number //ici si je met ! je spécifie que je ne l'initialise pas mais je devrai le faire par le constructeur (sauf abstract :))
    y? : number //ici je spécifie que y peux être ou un nombre ou uindefined

    abstract surface () : number
}

class Triangle extends Geometry{
    x: number = 15
    y: number = 42

    surface(){
        return this.x*this.y
    }
}
*/

//Nous avons aussi accès au class static, attention, existe également en js :)
/*
abstract class Geometry
{
    x! : number //ici si je met ! je spécifie que je ne l'initialise pas mais je devrai le faire par le constructeur (sauf abstract :))
    y? : number //ici je spécifie que y peux être ou un nombre ou uindefined

    abstract surface () : number

    static origin = { x : 0, y : 0}
}

class Triangle extends Geometry{
    x: number = 15
    y: number = 42

    surface(){
        return this.x*this.y
    }
}

//on peux accèder à origin sans avoir a instancier Triangle !
const a = Geometry.origin
*/




/*###########################################################
#                                                           #
#--------------------Exos 3 ----------------#
#                                                           #
#############################################################*/
// - Préparer un micro jeu de type heroes vs monster, 
/**
 * vous aurez 2 grandes classes, heroes et monster, 
 * le but, étant de pouvoir instancier un nouveau hero et un monstre avec des caractèristique différentes,
 * ils devront être stocker dans un objet tableau grace a une fonction, 
 * il devront pouvoir s'affronter graçe a des point de vie, d'attaque et de défénce,
 * si vous avez terminer dans les temps imparti, vous pouvez améliorer, utilisez votre imagination
 * requis: un generic, un narrowing, des classes, un static, une abstract, le tout entièrement typer !
 * n'hésitez par à utiliser l'html pour ça et le rendre encore plus chouette
 */


