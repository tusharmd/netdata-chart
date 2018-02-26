var dragSrcEl = null;
var dragTargetEl = null;

function handleDragStart(e) {
    //console.log('handleDragStart is called at ', e);
    // Target (this) element is the source node.
    //this.style.opacity = '0.4';

    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    //console.log('handleDragOver is called at ', e);
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.

    return false;
}

function handleDragEnter(e) {

    if(dragSrcEl === this) {
        return;
    }

    // this / e.target is the current hover target.
    
    //Remove hover from all 
    $('.over').removeClass('over');

    if(this.dataset.drop === 'custom-drop'){
        this.classList.add('over');
        dragTargetEl = this;
    }
}

function handleDragLeave(e) {
    // this / e.target is previous target element.
}

function handleDrop(e) {
    // this/e.target is current target element.
    if (e.stopPropagation) {
        e.stopPropagation(); // Stops some browsers from redirecting.
    }

    // Don't do anything if dropping the same column we're dragging.
    /* if (dragSrcEl != this) {
        // Set the source column's HTML to the HTML of the column we dropped on.
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    } */

    return false;
}

function handleDragEnd(e) {
    //console.log('handleDragEnd is called at ', e);
    // this/e.target is the source node

    //e.dataTransfer.effectAllowed = 'none';
    e.dataTransfer.dropEffect = "move";


    //e.target.parentNode.removeChild(e.target);

    if(e.target.dataset.position === "side"){
        //Move and change Attributes
        e.target.setAttribute('data-netdata', e.target.getAttribute('data-netdata-icon'));
        e.target.dataset.position = "";

        $(dragTargetEl).before(e.target);
        $(e.target).wrap('<div data-drop="custom-drop" data-position="main" draggable="true"></div>').parent().prepend('<p class=\'title\'><i class=\'fas fa-cog\'></i> '+e.target.innerHTML+'</p>');

        addDragEvents(e.target.parentNode);

        //To generate new chart
        NETDATA.globalReset();

        if(e.target.dataset.size === "small"){
            e.target.parentNode.classList.add("small");
        }else{
            e.target.parentNode.classList.add("big");
        }
        
    }else if(e.target.dataset.position === "main"){
        $(dragTargetEl).before(e.target);
    }

    //Remove hover from all 
    $('.over').removeClass('over');
}


var drops = document.querySelectorAll('div[data-drop]');
[].forEach.call(drops, function (drop) {
    addDragEvents(drop);
});

function addDragEvents(ele) {
    console.log("Adding Events to --> ",ele); 

    ele.addEventListener('dragstart', handleDragStart, false);
    ele.addEventListener('dragenter', handleDragEnter, false);
    ele.addEventListener('dragover', handleDragOver, false);
    ele.addEventListener('dragleave', handleDragLeave, false);
    ele.addEventListener('drop', handleDrop, false);
    ele.addEventListener('dragend', handleDragEnd, false);
}

$(document).ready(function(){
    $('p.title').on('dblclick', function(e){
        console.log('Event received on ',e); 
        $(e.currentTarget).siblings().toggle(300);
    });
});

