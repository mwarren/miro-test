function showStatistics(selection) {
  clear();
  const storyPoints = countStoryPoints(selection);
  getContainer().appendChild(createTotal(storyPoints));
}

function clear() {
  const elements = getContainer().getElementsByClassName('story-point-total')
  for (let i = 0; i < elements.length; i++) {
    elements.item(i).remove()
  }
}

function getContainer() {
  return document.getElementById('story-point-total');
}

function createTotal(storyPoints) {
  const statView = document.createElement('p');
  statView.innerHtml = `<span>${storyPoints}</span>`;
  return statView;
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
