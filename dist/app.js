"use strict";
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
class Italienne {
    getNbRoue() {
        return this.nbRoue;
    }
}
const taFiatPunto = new Italienne();
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
