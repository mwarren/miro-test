function showStatistics(selection) {
  setPointsTo(0);
  countStoryPoints(selection).then((storyPoints) => {
    console.log(`found ${storyPoints} story points in the selected widgets`);
    setPointsTo(storyPoints);
  });
}

function setPointsTo(x) {
  console.log(`story points being set to ${x}`);
  document.getElementById('story-point-counter').innerHtml = `${x}`;
}

async function countStoryPoints(selection) {
  const re = /\((?<points>\d+)\)/g;

  console.log(`examining ${selection.length} widgets`);
  var total = 0;

  for (const sel of selection) {
    const widgets = await miro.board.widgets.get({id: sel.id})
    const widget = widgets[0];
    console.log(widget);

    if (widget.title) {
      let match = re.exec(widget.title);
      if (match !== null) {
        total += parseInt(match.groups.points, 10);
      }
      else {
        console.log('regex didnt match the element title');
      }
    }
    else {
      console.log('element has no title');
    }
  }

  return total;
}

miro.onReady(() => {
  miro.addListener('SELECTION_UPDATED', (e) => {
    showStatistics(e.data)
  })
  miro.board.selection.get().then(showStatistics)
});
