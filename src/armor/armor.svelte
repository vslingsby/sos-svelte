<script>
  import { armorList } from "./armorlist.js";
  import { Button, Col, Row } from "sveltestrap";
  import currencyUtils from "../wealth/currency.js";
  import armorUtils from "./armor.js"
  let search = "";

let activeArmors = [];

function changeArmor(armor) {
  let index = -1;
  activeArmors.forEach( (activeArmor, i) => {
    if (activeArmor.name === armor.name) {
      index = i;
    }
  })

  if (index != -1) {
    activeArmors.splice(index, 1);
  } else activeArmors.push(armor);
  activeArmors = activeArmors;
}

</script>
<Row>
<Col>
<p>{JSON.stringify(activeArmors)}</p>
</Col>
</Row>
<Row>
  <Col><input bind:value={search} /></Col>
  <Row>
    <Col>
      <p><strong>Type</strong></p>
    </Col>
    <Col>
      <p><strong>Name</strong></p>
    </Col>
    <Col>
      <p><strong>AVP/AVC/AVB</strong></p>
    </Col>
    <Col>
      <p><strong>Coverage</strong></p>
    </Col>
    <Col>
      <p><strong>Qualities</strong></p>
    </Col>
    <Col>
      <p><strong>Wt</strong></p>
    </Col>
    <Col>
      <p><strong>Cost</strong></p>
    </Col>
  </Row>
</Row>
{#each armorList.filter((armor) => armor.name
      .toLowerCase()
      .search(search) != -1) as armor}
  <Row>
    <Col>
    {#if activeArmors.filter(activeArmor => activeArmor.name === armor.name).length > 0}
    <Button on:click={changeArmor(armor)}>Remove</Button>
    {:else}
    <Button on:click={changeArmor(armor)}>Add</Button>
    {/if}
    </Col>
    <Col>
      <p>{armor.type}</p>
    </Col>
    <Col>
      <p>{armor.name}</p>
    </Col>
    <Col>
      <p>{armor.avc}/{armor.avp}/{armor.avb}</p>
    </Col>
    <Col>
      <p>{armorUtils.coverageToString(armor.coverage)}</p>
      <p />
    </Col>
    <Col>
      <p>{armorUtils.qualitiesToString(armor.qualities)}</p>
    </Col>
    <Col>
      <p>{armor.wt}</p>
    </Col>
    <Col>
      <p>{currencyUtils.currencyToString(armor.cost)}</p>
    </Col>
  </Row>
{/each}
