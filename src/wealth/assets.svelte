<script>
  import { Button, Col, Row } from "sveltestrap";
  import { character } from "../stores.js";
  export let currentWealthPoints;
  let assets = [];
  export let liquidated = 0;
  let leftoverWealthPoints = 0;
  let assetLevels = ["Minor (W: 1 gp, L: 6 gp)", "Moderate (W: 2 gp, L: 12 gp)", "Major (W: 3 gp, L: 18 gp)"];

  function addNewAsset() {
    let obj = {
      name: "",
      level: 1,
    };
    assets.push(obj);
    assets = assets;
  }

  function addAssetLevel(index) {
    if (calculateLeftoverWealth() > 0 && assets[index].level < 3) {
      assets[index].level++;
    }
  }

  function removeAssetLevel(index) {
    if (assets[index].level > 1) {
      assets[index].level--;
    } else assets.splice(index, 1);
    assets = assets;
  }

  function calculateLeftoverWealth() {
    let sum = 0;
    sum += liquidated;
    assets.forEach((asset) => {
      sum += asset.level;
    });
    return currentWealthPoints - sum;
  }

  $: {
    assets = assets;
    leftoverWealthPoints = calculateLeftoverWealth();
    $character.wealth.assets = assets;
  }
</script>

<h3>Assets</h3>
{#each assets as asset, i}
  <Row>
    <Col>
      <p>Name: <input bind:value={asset.name} /></p>
    </Col>
    <Col>
      {assetLevels[asset.level - 1]}
    </Col>
    <Col>
      <Button on:click={() => addAssetLevel(i)}>+</Button>
      <Button on:click={() => removeAssetLevel(i)}>-</Button>
    </Col>
  </Row>
{/each}
<Row>
<Col>
<Button on:click={addNewAsset}>Add New Asset</Button>
</Col>
</Row>
<Row>
<Col>
<p>Liquidate Wealth:</p>
</Col>
<Col>
<input
  type="number"
  min="0"
  max={currentWealthPoints - assets.length}
  bind:value={liquidated} />
  </Col>
  </Row>
