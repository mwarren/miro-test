function showStatistics(selection) {
  setPointsTo(0);
  const storyPoints = countStoryPoints(selection);
  setPointsTo(storyPoints);
}

function setPointsTo(x) {
  document.getElementById('counter').innerHtml = `${x}`;
}

function countStoryPoints(selection) {
  const re = /^.*\((?<points>\d+)\)\s*$/mg;

  var total = 0;
  selection.forEach((item) => {
    if (item.title) {
      let match = re.exec(item.title);
      if (match !== null) {
        total += parseInt(match.groups.points, 10);
      }
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
