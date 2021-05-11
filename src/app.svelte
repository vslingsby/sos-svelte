<script>
  import { Button, Col, Row } from "sveltestrap";

  import Races from "./races/races.svelte";
  import Attributes from "./attributes.svelte";
  import BoonsAndBanes from "./boonsandbanes/boonsandbanes.svelte";
  import Skills from "./skills/skills.svelte";
  import Wealth from "./wealth/wealth.svelte";
  import Schools from "./schools/schools.svelte";
  import Magic from "./magic/magic.svelte";
  import Arcs from "./arcs.svelte"
  import Bio from "./bio.svelte"
  import Finalize from "./finalize.svelte"

  let pcp = 18;
  let racePCP = 1;
  let attributesPCP = 1;
  let bnbPCP = 1;
  let skillsPCP = 1;
  let wealthPCP = 1;
  let schoolPCP = 1;
  let magicPCP = 0;
  $: pcpRemaining =
    pcp - (racePCP + attributesPCP + bnbPCP + skillsPCP + wealthPCP + schoolPCP + magicPCP);

  let selectedRace = {};
  let selectedWealth = {};
  let attributes = {};
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
</svelte:head>

<head>
  <meta charset="utf-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, shrink-to-fit=no" />
</head>
<main>
  <Row>
    <Col>
      PCP ({pcpRemaining}
      remaining)
      <input type="number" bind:value={pcp} min="14" max="30" />
    </Col>
  </Row>
  <hr />
  <Row>
    <Col>
      <Races bind:usedPCP={racePCP} bind:selectedRace {pcpRemaining} />
    </Col>
  </Row>
  <hr />
  <Row>
    <Col>
      <Attributes
        bind:usedPCP={attributesPCP}
        bind:attributes={attributes}
        race={selectedRace}
        {pcpRemaining} />
    </Col>
  </Row>
  <hr />
  <Row>
    <Col>
      <BoonsAndBanes bind:usedPCP={bnbPCP} {pcpRemaining} />
    </Col>
  </Row>
  <hr />
  <Row>
    <Col>
      <Skills bind:usedPCP={skillsPCP} {attributes} {pcpRemaining} />
    </Col>
  </Row>
  <hr />
  <Row>
    <Col>
      <Wealth bind:usedPCP={wealthPCP} bind:selectedWealth {pcpRemaining} />
    </Col>
  </Row>
  <hr />
  <Row>
    <Col>
      <Schools bind:usedPCP={schoolPCP} race={selectedRace} {pcpRemaining} />
    </Col>
  </Row>
  <hr />
  <Row>
    <Col>
      <Magic bind:usedPCP={magicPCP} {pcpRemaining} />
    </Col>
  </Row>
  <hr />
  <Row>
    <Col>
      <Bio />
    </Col>
    <Col>
      <Arcs />
    </Col>
  </Row>
  <hr />
  <hr />
    <p>PCP: {pcp} ({pcpRemaining} remaining)</p>
    <p>Race: {racePCP}</p>
    <p>Attributes: {attributesPCP}</p>
    <p>Boons and Banes: {bnbPCP}</p>
    <p>Skills: {skillsPCP}</p>
    <p>Wealth and Social Class: {wealthPCP}</p>
    <p>Schools: {schoolPCP}</p>
    <p>Magic: {magicPCP}</p>
    <hr />
    <Row>
      <Col>
      <Finalize />
      </Col>
    </Row>
    <hr />
</main>
