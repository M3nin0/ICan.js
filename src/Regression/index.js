/**
 * Classe abstrata para os modelos de regressão
 */
class Regression {
    constructor(modelX=null, modelY=null) {
        if (new.target == Regression) {
            throw new TypeError("This class can not be instantiated");
        }

        this.modelX = modelX;
        this.modelY = modelY;
    }

    /**
     * Método para inferir a posição do mouse dado a localização do nariz do usuário
     * @param {*} nose 
     */
    inferMousePosition(nose) {
        throw new Error("This methods needs to be overwritten");
    }

    /**
     * Método para realizar a regressão
     * @param {*} data 
     */
    doRegression(data) {
        throw new Error("This methods needs to be overwritten");
    }

    trainModel(xDataset, yDataset) {
        throw new Error("This methods needs to be overwritten");
    }
}

class LinearRegression extends Regression {

    /**
     * Método para inferir a posição do mouse dado a localização do nariz do usuário
     * @param {*} nose 
     */
    inferMousePosition(nose) {
        if (this.modelX === null || this.modelY === null) {
            throw Error("It is necessary to train the model before using this method");
        }

        let xPredict = (nose.position.x * this.modelX.gradient) + this.modelX.intercept;
        let yPredict = (nose.position.y * this.modelY.gradient) + this.modelY.intercept;

        return {
            x: xPredict,
            y: yPredict
        }
    }

    /**
     * Método para realizar a regressão
     * Script adaptado de: (https://github.com/brownhci/WebGazer/blob/master/src/regression.js)
     * @param {*} data 
     */
    doRegression(data) {
        let n = 0;
        let results = [];
        let sum = [0, 0, 0, 0, 0];
        
        for (; n < data.length; n++) {
            if (data[n][1] !== null) {
                sum[0] += data[n][0];
                sum[1] += data[n][1];
                sum[2] += data[n][0] * data[n][0];
                sum[3] += data[n][0] * data[n][1];
                sum[4] += data[n][1] * data[n][1];
            }
        }

        // Cálculo do intercepto e do gradiente da reta
        let gradient = (n * sum[3] - sum[0] * sum[1]) / (n * sum[2] - sum[0] * sum[0]);
        let intercept = (sum[1] / n) - (gradient * sum[0]) / n;

        for (let i = 0; i < data.length; i++) {
            var coordinate = [data[i][0], data[i][0] * gradient + intercept];
            results.push(coordinate);
        }

        return {
            gradient: gradient,
            intercept: intercept
        }
    }

    trainModel(xDataset, yDataset) {
        if (this.modelX !== null || this.modelY !== null) {
            throw new Error("The weights have already been defined, it is not possible to train the model")
        }

        // Realiza as regressões para cada um dos datasets
        this.modelX = this.doRegression(xDataset);
        this.modelY = this.doRegression(yDataset);
    }
}

export {
    Regression,
    LinearRegression
}
