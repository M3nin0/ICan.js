/**
 * Funções para auxiliar o funcionamento do sistema. Veja que, mesmo utilizando o p5.js
 * as alterações no DOM estou fazendo manualmente, isto porque, mesmo a lib do p5.dom.js
 * sendo muito legal, estou fazendo manualmente para aprender mais sobre a manipulação de DOM
 */

import p5 from "p5";

/**
 * Função para alterar a posição de uma div
 * @param {*} div 
 */
function changeDivPosition(div, x, y) {
    div.style.position = "absolute";

    div.style.left = x + "px";
    div.style.top = y + "px";
}

/**
 * Função para adicionar uma div na página
 * @param {*} text 
 */
function createDiv(className) {    
    let div = document.createElement("div");
    div.className = className;

    // Inserindo elemento na página
    let body = document.getElementsByTagName("body")[0];
    body.appendChild(div);

    return div;
}

/**
 * Método para recuperar o nome da classe predito pelos classificadores de Libras
 */
function getGestureNameFromPredict(predict) {
    const classes = ["Amigo", "Desculpa", "Telefone"];

    return classes[predict.indexOf(p5.prototype.max(Array.from(predict)))];
}

/**
 * Função para configurar o elemento de vídeo utilizado nas classificações
 * @param {*} videoElementName 
 */
function setupVideo() {
    let videoCapture = document.getElementById("videoElementICJS");
    
    if (videoCapture === null) {
        throw Error("You need to add an element with videoElementICJS id in your HTML code");
    }

    videoCapture.height = 180;
    videoCapture.width = 180;
    videoCapture.hidden = true;

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {
            videoCapture.srcObject = stream;
        }).catch((error) => {
            alert(error);
        });
    }

    return videoCapture;
}

export {
    getGestureNameFromPredict, setupVideo, createDiv, changeDivPosition
}
