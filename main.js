let previousDirection = "Right";
let isLeftDirection = false;

class GameEngine { // tworzę klase (czyli szablon o nazwie GameEngine). Klasa została nazwana GameEngine
    constructor(numberOfEnemies) { 
        // tworzę konstruktora w, którym znajdą się  zmienne (szufladki typu "kategoria" - moja nazwa. Czyli wyszczególnenie co znajduje się w szablonie)
        this.numberOfEnemies = numberOfEnemies // liczba eneiesów , które chcemy storzyć
        this.enemies = (() => {
            let enemiesArr = [];
            let arrayColumnPosition = 0; 
            let arrayRowPosition = 10; //pozycja początkowa pierwszego elementu tablicy
            for (let i = 0; i < this.numberOfEnemies; i++) { // w funkcji określam zadanie - pętla, która przeszukuje mi pcała tablicę ?????
                if ((i !== 0) && (i % 5 == 0)) { //  bez początkowego co piaty element
                    arrayRowPosition += 50;
                    arrayColumnPosition = 0;
                }
                let enemy = new Enemy(arrayColumnPosition * 50, arrayRowPosition); // tworzymy zmienną lokalną , która jest obiektem i ma przypisany szablon klasy Enemy z prarametrami
                arrayColumnPosition++; // podwajamy zmienną
                enemiesArr.push(enemy); // do tablicy enemies dodajemy nasza zmienną enemy
            }
            return enemiesArr;
        })()
        this.bullets = []; // definiuję/tworzę  zmienną (szufladkę - typu kategoria) o nazwie bullets (mają to być naboje dla gohatera , czyli tworzymy tablicę) - Zmiennej bullets przypisuje pustą  tablice. (jeżeli nie jest to obekt coś jest większe nić jeden oobiekt - TO MA TO BYĆ W TABLICY !!!!)
        this.bulletsEnemies = []; // definiuję/tworzę  zmienną (szufladkę typu kategoria) o nazwie bulletsEnemies i przypisuje do niej pustą tablice tj. u w/w zmiennych.
        this.player = new Player(); // definiuję/tworzę  zmienną (szufladkę - typu kategoria) o nazwie player. Zmienna to klasa (szablon) skopiowana z klasy Player 
        this.score = 0; // definiuję/tworzę  zmienną (szufladkę typu kategoria) score o nazwie score, która ma przypisaną wartość - liczbę początkową 0.
        this.level = 1; // definiuję/tworzę  zmienną (szufladkę typu kategoria) o nazwie level i przypisuję do niej liczbę 1 - zmienna ma dotyczyć poziomu w grze.
        this.boardScore = (() => { // definiuję/tworzę  zmienną (szufladkę typu kategoria) o nazwie boardScore. Zmienna jest funkcją strzałkową, czyli po urochomieniu gry od razu, automatycznie się wywoła. 
            const scoreInput = document.createElement('div');  // W zmiennej boardScore, która jest funkcją - tworzymy zmienną (szufladkę) o nazwie scoreInput. Zmienna scoreInput kreuje w pliku html div 
            scoreInput.id = "score"; // wyżej utworzona zmienna to div i div dostaje identyfikator
            scoreInput.style.position = "absolute"; // utworzona zmienna - div dostaje style. Tu pozycja. Tak samo jak to się dzieje w css tylko tu jest w js.
            scoreInput.style.left = "10px";  // tworze style dla diva cd. Tu z pozycji w/w absolute dodaje jeszcze plus 10 px do tego aby był ustawiony bardziej na lewo. 
            scoreInput.style.height = "20px"; // tworze style dla diva cd. Tu wysokość.
            scoreInput.innerHTML = "score: " + this.score; // zmienna dostała interfejs - innerHTML, który renderuje przypisany do zmiennej tekst ("score: " + this.score;) do htlm'u
            document.getElementById('GameBoard').appendChild(scoreInput); //  z dukument html chwytamy kontener GameBoard i dodajemy mu dziecko, nasze zmienną scoreInput. Wcześniej js tworzy div w html ale nie mówi mu gdzie ma się znajdywać. Tu js mówi hmlt gdzie ma się pojawić dany kontener - zmienna
            return scoreInput; // wszystko co zostało wyżej określone zostaje zwrócone - czyli aktywowane. 
        })() // funkcja zostaje automatycznie aktywowana.
        this.boardLevel = (() => { // tak jak wyżej. Taka sama procedura lecz dla zdefiniowanej zmiennej boardLevel
            const levelInput = document.createElement('div'); 
            levelInput.id = "level"; 
            levelInput.style.position = "absolute";
            levelInput.style.left = "220px";
            levelInput.style.height = "20px";
            levelInput.innerHTML = "level: " + this.level; 
            document.getElementById('GameBoard').appendChild(levelInput);
            return levelInput;
        })()
    }
    addBulletToArray(bullet) { // Do klasy GameEngine dodajemy metodę - funcję, która ma za zadanie dodać naboje do tablicy. Tam metoda przyjmuje parametr bullet
        let isCreated = false; // definiujemy zmienną (tworzymy szufladkę) o nazwie isCreated i przypisujemy jej wartość false
        for (let i = 0; i < this.bullets.length; i++) { // tworzymy działanie na funkcji, które sprawdza naszą tablicę bullets. Petla przechodzi od początku do końca długości tablicy.
            if (!this.bullets[i]) { // dla pętli tworzę warunek. Pętla szuka - !this.bullets[i] jeżeli będzie puste miejsce w tablicy. Dlaczego - ponieważ ! jest negacją czyli - Jeżeli nie będzie obiektu z tablicy bullets o danym indeksie to JS czyta dalej co musi zrobić.
                this.bullets[i] = bullet; // jeżeli pętla znajdzie w/w warunek to  obiekt z tablicy bullets o danym indeksie zostaje przpisany do parametru bullet
                isCreated = true; // a następnie zmienna isCreated zmienia Swoją wartość na prawdziwą.
                break; // po znalezieniu warunku, pętla zostaje przerwana i nie szuka dalej. I wychodzimy z pętli.
            }
        }
        //this.createEnemies(bullet)
        if (!isCreated) { // następnym etapem w  tej funckji jest  ???????????????
            this.bullets.push(bullet); // do zmiennej this.bullet (która jest kategorią w konstruktorze w klasie GameEngine) dodajemy do tablicy bullet.
        }
    }
    checkNextLevel(){
        let isNextLevelNeeded = true;
        for( let i = 0; i < this.enemies.length; i++){
            if(this.enemies[i]){
                isNextLevelNeeded = false;
                break;
            }
        }
        return isNextLevelNeeded;
    }   
    nextLevel(){
        this.level += 1;
        this.boardLevel.innerHTML = "level: " + this.level;
        previousDirection = "Right"
        this.createNewEnemies(30);
    
    }
    createNewEnemies(quantity){
        let arrayColumnPosition = 0; 
        let arrayRowPosition = 10;
        for(let i = 0; i < quantity; i++){
            if ((i !== 0) && (i % 5 == 0)) { //  bez początkowego co piaty element
                arrayRowPosition += 50;
                arrayColumnPosition = 0;
            }
            let enemy = new Enemy(arrayColumnPosition * 50, arrayRowPosition);
            arrayColumnPosition++;
            if( i < this.enemies.length && !this.enemies[i]){
                this.enemies[i] = enemy;
            }
            else{
                this.enemies.push(enemy);
            }
        }
    }

    endGameBoard() {
        for (let i = 0; i < this.enemies.length; i++) {
            if (!this.enemies[i]) {
                document.querySelector("container__game_rules").style.display = action;

            }

        }
    }

    findFirstEnemyOnLeft() { // definiujemy metodę z funckją 
        let minimumPositionX = 450; // definiujemy zmienną (tworzymy szufladkę) minimumPositionX i przypisujemy do niej wartość 450;
        let enemyIndex = 0; // definiujemy zmienną (tworzymy szufladkę) enemyIndex i przypisujemy do niej wartość początkową = 0;
        for (let i = 0; i < this.enemies.length; i++) { 
            if (this.enemies[i] && this.enemies[i].positionX < minimumPositionX) {
                minimumPositionX = this.enemies[i].positionX;
                enemyIndex = i;
            }
        }
        return this.enemies[enemyIndex];
    }
    findFirstEnemyOnRight() {
        let maxPositionX = 0;
        let enemyIndex = 0;
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i] && this.enemies[i].positionX > maxPositionX) {
                maxPositionX = this.enemies[i].positionX;
                enemyIndex = i;
            }
        }
        return this.enemies[enemyIndex];
    }
    moveBullets() {
        for (var i = 0; i < this.bullets.length; i++) {
            if (this.bullets[i]) {
                this.bullets[i].move();
            }
        }
        for (var i = 0; i < this.bulletsEnemies.length; i++) {
            if (this.bulletsEnemies[j]) {
                this.bulletsEnemies[j].move();
            }
        }
    }

    moveEnemies() {
        let dir = previousDirection;
        if (previousDirection == "Right" && this.findFirstEnemyOnRight().positionX == 450) {
            dir = "Down";
            isLeftDirection = false;
        }
        else if (previousDirection == "Down") {
            if (isLeftDirection == false) {
                dir = "Left";
            }
            else dir = "Right";
        }
        else if (previousDirection == "Left" && this.findFirstEnemyOnLeft().positionX == 20) {
            dir = 'Down';
            isLeftDirection = true;
        }

        for (var i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i]) {
                this.enemies[i].move(dir);
            }
        }
        previousDirection = dir
    }

    checkBulletLifeTime() {
        for (let i = 0; i < this.bullets.length; i++) {
            if (this.bullets[i] && this.bullets[i].positionY == 0) {
                this.bullets[i].delete();
                delete this.bullets[i];
            }
            for (let j = 0; j < this.enemies.length; j++) {
                if (this.enemies[j] && this.bullets[i] && ((this.enemies[j].positionY + 35) >= this.bullets[i].positionY) && ((this.enemies[j].positionX + 35) >= this.bullets[i].positionX && this.enemies[j].positionX <= this.bullets[i].positionX)) {
                    this.enemies[j].health -= 1;
                    this.enemies[j].DOMElement.firstChild.src = "img/enemy_lips_red.png"
                    if (this.enemies[j].health == 0) {
                        this.enemies[j].delete();
                        delete this.enemies[j];
                        this.score += 100;
                        // game1.boardScore.text = game1.score;
                        this.boardScore.innerHTML = "score: " + this.score;
                        console.log(game1.score)
                    }
                    this.bullets[i].delete();
                    delete this.bullets[i];
                    break;
                }
            }
        }
    }
}
class Player {
    constructor() {
        this.sprite = document.getElementById('hero');
        this.speed = 10;
        this.health = 3;
        this.positionX = 240;
        this.positionY = 480;
        this.sprite.style.left = this.positionX + 'px';
        this.boardPlayerLive = (() => {
            const playerLiveInput = document.createElement('div'); 
            playerLiveInput.id = "level"; 
            playerLiveInput.style.position = "absolute";
            playerLiveInput.style.left = "450px"; 
            playerLiveInput.style.height = "20px";
            playerLiveInput.innerHTML = "live: " + this.health; 
            document.getElementById('GameBoard').appendChild(playerLiveInput);
            return playerLiveInput;  
        })()

    }
    move(key) {
        if (key == 'ArrowLeft') {
            this.positionX -= this.speed;
            if (this.positionX <= 0) {
                this.positionX = 0;
            }
            this.sprite.style.left = this.positionX + 'px';
            console.log(this.sprite.style.left)
        }
        else {
            this.positionX += this.speed;
            if (this.positionX >= 450) {
                this.positionX = 450;
            }
            this.sprite.style.left = this.positionX + 'px';
        }
    }
    shoot(gameObject) {
        let bullet = new Bullet(this.positionX, this.positionY);
        bullet.createSprite();
        gameObject.addBulletToArray(bullet);
    }
}
class Enemy {
    constructor(positionX, positionY, speed) {
        this.speed = speed;
        this.health = 2;
        this.positionX = positionX;
        this.positionY = positionY;
        this.DOMElement = (() => {
            let enemyImg = document.createElement('img');
            enemyImg.id = "image"
            enemyImg.src = "img/enemy_lips_black.png";
            enemyImg.style.width = '40px';
            enemyImg.style.height = '25px';


            let enemy = document.createElement("div");
            enemy.id = "enemy";
            enemy.style.top = this.positionY + 'px';
            enemy.style.left = this.positionX + 'px';
            enemy.appendChild(enemyImg);
            this.DOMElement = enemy;
            document.getElementById("GameBoard").appendChild(enemy);
            return enemy;
        })()
    }
    move(direction) {
        if (direction == 'Right') {
            this.positionX += 1;
            this.DOMElement.style.left = this.positionX + 'px';
        }
        if (direction == 'Down') {
            this.positionY += 5;
            this.DOMElement.style.top = this.positionY + 'px';
        }
        if (direction == 'Left') {
            this.positionX -= 1;
            this.DOMElement.style.left = this.positionX + 'px';
        }

    }
    shoot(gameObject) {
        let enemyBullet = document.createElement("div");
        enemyBullet.style.top = this.positionX + "px";
        enemyBullet.style.left = this.positionY + "px";
        let enemyBulletImg = document.createElement("img");
        enemyBulletImg.id = "image";
        enemyBulletImg.src = "img/water_drop.jpg";
        enemyBulletImg.style.width = "5px";
        enemyBulletImg.style.height = "5px";
        enemyBullet.appendChild(enemyBulletImg);
        document.getElementById('GameBoard').appendChild(enemyBullet);
        gameObject.bulletsEnemies.push(enemies);
    }
    delete() {
        this.DOMElement.remove();
    }
}

class Bullet {
    constructor(positionX, positionY, image) {
        this.power = 1;
        this.speed = 5;
        this.positionX = positionX;
        this.positionY = positionY;
        this.DOMElement;
    }
    createSprite() {
        // funckja strzałkowa ;img
        let bullet = document.createElement('div');
        bullet.id = 'laser';
        bullet.style.top = this.positionY + 'px';
        bullet.style.left = this.positionX + 'px';
        this.DOMElement = bullet;
        document.getElementById("GameBoard").appendChild(bullet);
    }
    move() {
        this.positionY -= 10;
        this.DOMElement.style.top = this.positionY + 'px';
    }

    delete() {
        this.DOMElement.remove();
    }
}


let isFirstCyclic = true;

var game1 = new GameEngine(20);
function loop() {

    if (isFirstCyclic == true) {
        isFirstCyclic = false;
    }
    if (game1.enemies.length > 0) {
        game1.moveEnemies();
        game1.addBulletToArray();
    }
    if (game1.bullets.length > 0) {
        game1.moveBullets();
        game1.checkBulletLifeTime();
    }
    if ( game1.checkNextLevel()){
        game1.nextLevel();

    }
    document.onkeydown = function (evt) {
        if (evt.key == 'ArrowRight' || evt.key == 'ArrowLeft') {
            console.log(evt)
            game1.player.move(evt.key);
        }
        if (evt.key == ' ') {
            game1.player.shoot(game1);
        }
        if (evt.key == 'g') {
            
        }
    }
}


setInterval(loop, 40);