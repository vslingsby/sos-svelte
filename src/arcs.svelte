<script>
import { Button, Col, Row } from "sveltestrap";
import { character } from "./stores.js";

let arcs = {
  saga: '',
  epic: '',
  glory: '',
  belief: '',
  flaw: ''
};

$character.race;
let human;

function isHuman() {
  if ($character.race === "Human") {
    return true;
  } else return false;
}

$: {
  human = isHuman()

  $character.arcs = arcs;
}
</script>

<h2>Arcs</h2>
<!--
Saga, Epic, Belief, Glory, Flaw
-->
<p> Saga: <textarea bind:value={arcs.saga} /></p>
<p> Epic: <textarea bind:value={arcs.epic} /></p>
<p> Belief:  <textarea bind:value={arcs.belief} /></p>
<p> Glory:  <textarea bind:value={arcs.glory} /></p>
<p> Flaw: <textarea disabled={$character.race != "Human"} bind:value={arcs.flaw} /></p>
