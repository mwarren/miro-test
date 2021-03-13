function showStatistics(selection) {
  setPointsTo(0);
  const storyPoints = countStoryPoints(selection);
  console.log(`found ${storyPoints} story points in the selected widgets`);
  setPointsTo(storyPoints);
}

function setPointsTo(x) {
  console.log('updating story points');
  document.getElementById('counter').innerHtml = `${x}`;
}

function countStoryPoints(selection) {
  const re = /^.*\((?<points>\d+)\)\s*$/mg;

  console.log(`examining ${selection.length} widgets`);
  var total = 0;
  selection.forEach((sel) => {
    console.log(sel);
    const widget = miro.board.widgets.get({id: sel.id});
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
  });

  return total;
}

miro.onReady(() => {
  miro.addListener('SELECTION_UPDATED', (e) => {
    showStatistics(e.data)
  })
  miro.board.selection.get().then(showStatistics)
});
