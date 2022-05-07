# Tezonacci

Fun project

TODO: make fibonacci golden ratio grid

```
<div class="container">
  <div class="item a">A</div>
  <div class="item b">B</div>
  <div class="item c">C</div>
  <div class="item d">D</div>
  <div class="item e">E</div>
  <div class="item f">F</div>
  <div class="item g">G</div>
</div>
```

```
$width: 70vw;
$height: $width / 1.618;
$border: 0.5px solid #4A4949;

body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  
  font-family: "Roboto", sans-serif;
}

.container {
  width: $width;
  height: $height;
  border: $border;
  display: grid;
  
  grid-template-columns: 61.8% 9.02% 5.58% 23.6%;
  grid-template-rows: 61.8% 9.02% 5.58% 23.6%;
  grid-template-areas: 
    "A B B B"
    "A E F C"
    "A E G C"
    "A D D C";  
}

.item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  
  color: #F2F2F2;
  font-size: 1.5em;
  font-weight: 700;
  text-shadow: 1px 1px 1px #878787;
  box-sizing: border-box;
  border: $border;
  
  &.a {
    grid-area: A;
    background-color: #a0ddff;
  }
  &.b {
    grid-area: B;
    background-color: #c1cefe;
  }
  &.c {
    grid-area: C;
    background-color: #758ecd;
  }
  &.d {
    grid-area: D;
    background-color: #7189ff;
  }
  &.e {
    grid-area: E;
    font-size: 1.2em;
    background-color: #624cab;
  }
  &.f {
    grid-area: F;
    font-size: 1em;
    background-color: #5d2e8c;
  }
  &.g {
    grid-area: G;
    font-size: 0.7em;
    background-color: #7a7a7a;
  }
}
```
