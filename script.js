document.addEventListener("DOMContentLoaded", () => {
    var canvas = document.getElementById('captcha');
    var ctx = canvas.getContext('2d');
    var captchaText = generateCaptchaText(6);
    const captchaStatus = document.getElementById('captcha-status');
    captchaStatus.style.opacity = 0;
    drawCaptcha(captchaText);

    //Função para verificar se CAPTCHA está correto
    function verifyCaptcha() {
        var inputText = document.getElementById('captcha-input').value.toLowerCase();

        captchaStatus.style.opacity = 1;
        if (inputText === captchaText.toLowerCase()) {
            captchaStatus.textContent = "Captcha Correto!";
            captchaStatus.style.color = 'green';
        } else if (inputText.lenght < 6) {
            captchaStatus.textContent = "Digite todos os caracteres!";
            captchaStatus.style.color = 'red';
        } else {
            captchaStatus.textContent = "Captcha Incorreto. Tente novamente!";
            captchaStatus.style.color = 'red';
        }
        setTimeout(() => {
            captchaStatus.style.opacity = 0;
        }, 3000)
        document.getElementById('captcha-input').value = '';
        captchaText = generateCaptchaText(6);
        drawCaptcha(captchaText);
    }

    //Adiciona o EventListener pra o botão verificar
    document.getElementById('check-captcha').addEventListener("click", verifyCaptcha);

    //Adiciona o EventListener pra o botão recarregar
    document.getElementById('reload-captcha').addEventListener("click", () => {
        captchaText = generateCaptchaText(6);
        drawCaptcha(captchaText);
        document.getElementById('captcha-input').value = '';
        captchaStatus.style.opacity = 0;
    });

    //Função pra gerar os 6 caracteres aleatórios do capctcha
    function generateCaptchaText(lenght) {
        let result = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy0123456789';
        const charsLength = chars.length;
        for (let i = 0; i < lenght; i++) {
            result += chars.charAt(Math.floor(Math.random() * charsLength));
        }
        return result;
    }

    function drawCaptcha(text) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#f3f3f3';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        addNoise(ctx);
        ctx.fillStyle = '#06108c99';
        ctx.font = '24px Arial';

        //Calcula a largura do texto e sua posição inicial
        const textWidth = ctx.measureText(text).width;
        const startX = (canvas.width - textWidth) / 3;

        //Adiconando rotação e distorção
        for (let i = 0; i < text.length; i++) {
            ctx.save();
            ctx.translate(startX + i * 20, 30);
            ctx.rotate((Math.random() - 0.5) * 0.4);
            ctx.fillText(text[i], 0, 0);
            ctx.restore();
        }
    }
    //Função para fazer o efeito de distorção
    function addNoise(ctx) {
        console.log("aaaa")
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        for (let i = 0; i < pixels.length; i += 1) {
            //Adiciona cores aleatorias na distorção
            let color = (Math.random() > 0.5) ? 200 : 0;
            pixels[i] = pixels[i + 1] = pixels[i + 2] = color;
        }
        ctx.putImageData(imageData, 0, 0);
    }
});