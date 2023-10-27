var notepad_array = [];
var lines = [];
var fake_text = [];
var mousestate = "";
var startpos = "";
var endpos = "";

let notepad = document.getElementById("notepad");

notepad.onkeypress = NotepadUpdate;

function NotepadUpdate() {
  lines = notepad.value.split(/\r?\n/); //split lines
  SetFakeText();
}

function SetFakeText() {
  let div_text = "";
  lines.forEach(function (line, y) {
    line_array = line.split("");
    line_array.forEach(function (letter, x) {
      let id = "cell_" + x + "_" + y;
      let EOnMouseDown = "onmousedown='OnMouseDown(this);' ";
      let EOnMouseMove = "onmousemove='OnMouseMove(this);' ";
      let EOnMouseUp = "onmouseup='OnMouseUp(this);' ";
      div_text =
        div_text +
        "<DIV class='cell' id='" +
        id +
        "' " +
        EOnMouseDown +
        EOnMouseMove +
        EOnMouseUp +
        ">" +
        letter +
        "</div>";
    });
    div_text = div_text + "</br>";
  });

  document.getElementById("faketext").innerHTML = div_text;
}

function OnMouseDown(el) {
  mousestate = "onmousedown";
  startpos = el.id;
  el.classList.add("mark");
}

function OnMouseMove(el) {
  let sx, sy, ex, ey;
  [sx, sy] = startpos.replace("cell_", "").split("_");
  if (mousestate == "onmousedown") {
    //mark all from startpos to el.id in square
    [ex, ey] = el.id.replace("cell_", "").split("_");
    for (let y = sy; y <= ey; y++) {
      for (let x = sx; x <= ex; x++) {
        let textID = "cell_" + x + "_" + y;
        document.getElementById(textID).classList.add("mark");
      }
    }
  }
}

function OnMouseUp(el) {
  mousestate = "onmouseup";
  endpos = el.id;
}

function setCaret() {
  var el = document.getElementById("editable");
  var range = document.createRange();
  var sel = window.getSelection();
  range.setStart(el.childNodes[2], 5);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
  el.focus();
}
