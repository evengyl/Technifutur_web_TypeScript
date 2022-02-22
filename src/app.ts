
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
