import React from 'react/addons';
import {List} from 'immutable';
import {Voting} from '../../src/components/Voting';
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate}
  = React.addons.TestUtils;

describe('Voting', () => {

  it('renders a pair of buttons', () => {
    const component = renderIntoDocument(
      <Voting pair={["Trainspotting", "28 Days Later"]} />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal('Trainspotting');
    expect(buttons[1].textContent).to.equal('28 Days Later');
  });

  it('invokes callback when a button is clicked', () => {
    let votedWith;
    const vote = (entry) => votedWith = entry;

    const component = renderIntoDocument(
      <Voting pair={["Trainspotting", "28 Days Later"]}
        vote={vote}/>
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, "button");
    Simulate.click(buttons[0]);
    expect(votedWith).to.equal('Trainspotting');
  });

  it('renders as a pure component', () => {
    const pair = ['Trainspotting', '28 Days Later'];
    const component = renderIntoDocument(
      <Voting pair={pair} />
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Trainspotting');

    pair[0] = 'Sunshine';
    component.setProps({pair: pair});
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Trainspotting');
  });

  it('does update dom when prop changes', () =>{
    const pair = List.of('Trainspotting', '28 Days Later');
    const component = renderIntoDocument(
      <Voting pair={pair} />
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Trainspotting');

    const newPair = pair.set(0, 'Sunshine');
    component.setProps({pair: newPair});
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Sunshine');
  })
});
