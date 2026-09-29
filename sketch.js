let slider;
let L = 29.53;
let S = 30.4375;
let m = L / S;

function setup() {
    createCanvas(windowWidth * 0.99, 500);
    textAlign(CENTER, CENTER);
    slider = createSlider(1, 99, 50);
    slider.position(10, 530);
    slider.size(700);
}

function draw() {
    background(20);
    translate(0, -40);
    let offset = slider.value() / 90.0 * S;
    if (offset - L > 0) {
        offset = offset - L;
    }

    var zodiac = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];
    var dates = [0, 30, 61, 92, 124, 155, 186, 216, 246, 276, 305, 335, 365.25];
    var signs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var month_dates = [11, 41, 72, 102, 133, 164, 194, 225, 255, 286, 317, 345];
    for (let i = 0; i < 12; i++) {
        signs[i] = dates[i] / 365.25 * width * 0.95 + width * 0.025;
        var len = dates[i + 1] / 365.25 * width * 0.95 + width * 0.025 - signs[i];
        stroke(0);
        strokeWeight(2);
        fill(191, 249, 255);
        if (i < 9) {
            fill(255, 229, 191);
        }
        if (i < 6) {
            fill(255, 191, 191);
        }
        if (i < 3) {
            fill(232, 255, 191);
        }
        rect(signs[i], height / 2 - 25, len, 50);
        strokeWeight(1);
        line(month_dates[i] / 365 * width * 0.95 + width * 0.025, height / 2, month_dates[i] / 365 * width * 0.95 + width * 0.025, height / 2 + 25);
        var names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        noStroke();
        fill(255);
        textSize(30);
        text(zodiac[i], signs[i], height / 2 - 50);
        textSize(15);
        text(names[(i + 3) % 12] + " 1", month_dates[i] / 365 * width * 0.95 + width * 0.025, height / 2 + 40);
        var str = date_to_str(dates[i]);
        text(str, signs[i], height / 2 - 80);
    }
    noStroke();
    fill(255);
    textSize(30);
    text(zodiac[0], width * 0.975, height / 2 - 50);
    textSize(15);
    var str = date_to_str(dates[0]);
    text(str, width * 0.975, height / 2 - 80);

    let first = true;
    for (let i = 0; i < 13; i++) {
        stroke(255, 0, 0);
        fill(255);
        strokeWeight(1);
        let date = offset + L * i;
        let x = date / 365.25 * width * 0.95 + width * 0.025;
        let sign_x_left = signs[i];
        if (x < width * 0.975) {
            line(x, height / 2 - 25, x, height / 2 + 100);
            noStroke();
            textSize(20);
            text("🌑", x, height / 2 + 120);
            text("🌕", x + (L / 2) / 365.25 * width * 0.95, height / 2 + 70);
            var str1 = date_to_str(date);
            var str2 = date_to_str(date + 15);
            textSize(15);
            text(str1, x, height / 2 + 145);
            text(str2, x + (L / 2) / 365.25 * width * 0.95, height / 2 + 95);

            if (i == 0) {
                text("🌕", x - (L / 2) / 365.25 * width * 0.95, height / 2 + 70);
                str2 = date_to_str(date - 15);
                text(str2, x - (L / 2) / 365.25 * width * 0.95, height / 2 + 95);
            }
            textSize(20);
            fill(255, 0, 0);
            if (sign_x_left < x) {
                if (first) {
                    text("← " + ((i + 1) % 12 + 1) + " →", x - width * 0.95 / 12 * m * 0.5, height / 2 + 120);
                    if ((offset + L * (i + 1)) / 365.25 * width * 0.95 + width * 0.025 > width * 0.975) {
                        text("← " + ((i + 2) % 12 + 1) + " →", x + width * 0.95 / 12 * m * 0.5, height / 2 + 120);
                    }
                }
                else {
                    text("← " + ((i) % 12 + 1) + " →", x - width * 0.95 / 12 * m * 0.5, height / 2 + 120);
                }
            }
            else {
                fill(255, 0, 0);
                if (first) {
                    fill(150, 150, 255);
                    first = false;
                }
                text("← " + ((i) % 12 + 1) + " →", x - width * 0.95 / 12 * m * 0.5, height / 2 + 120);
                fill(255, 0, 0);
                if ((offset + L * (i + 1)) / 365.25 * width * 0.95 + width * 0.025 > width * 0.975) {
                    text("← " + ((i + 1) % 12 + 1) + " →", x + width * 0.95 / 12 * m * 0.5, height / 2 + 120);
                }
            }
        }
    }
}

function date_to_str(date) {
    var day = floor((date + 79) % 365) + 1;
    var months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var sum = 0;
    var result = "";
    for (let i = 0; i < 12; i++) {
        sum += months[i];
        if (day <= sum) {
            result = names[i] + " " + (day - (sum - months[i]));
            break;
        }
    }
    return result;
}
