var dragSrcEl = null;

    function handleDragStart(e) {
        console.log('handleDragStart is called at ',e);
        // Target (this) element is the source node.
        //this.style.opacity = '0.4';

        dragSrcEl = this;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragOver(e) {
        console.log('handleDragOver is called at ',e);
        if (e.preventDefault) {
            e.preventDefault(); // Necessary. Allows us to drop.
        }

        e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

        return false;
    }

    function handleDragEnter(e) {
        console.log('handleDragEnter is called at ',e);
        // this / e.target is the current hover target.
        this.classList.add('over');
    }

    function handleDragLeave(e) {
        console.log('handleDragLeave is called at ',e);
        this.classList.remove('over');  // this / e.target is previous target element.
    }

    function handleDrop(e) {
        console.log('handleDrop is called at ',e);
        // this/e.target is current target element.

        if (e.stopPropagation) {
            e.stopPropagation(); // Stops some browsers from redirecting.
        }

        // Don't do anything if dropping the same column we're dragging.
        if (dragSrcEl != this) {
            // Set the source column's HTML to the HTML of the column we dropped on.
            dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');
        }

        return false;
    }

    function handleDragEnd(e) {
        console.log('handleDragEnd is called at ',e.target);
        // this/e.target is the source node

        //e.dataTransfer.effectAllowed = 'none';
        e.dataTransfer.dropEffect = "move";


        //e.target.parentNode.removeChild(e.target);

        e.target.setAttribute('data-netdata', e.target.getAttribute('data-netdata-icon'));

        //document.querySelector('.chartRight').appendChild(e.target);
        var chartTable = document.querySelector('.chartRight');
        chartTable.insertBefore(e.target,chartTable.firstChild);

        NETDATA.globalReset();

        [].forEach.call(cols, function (col) {
            col.classList.remove('over');
        });
    }

    var cols = document.querySelectorAll('#custom-charts .custom-charts');
    console.log(cols);
    
    [].forEach.call(cols, function (col) {
        col.setAttribute('draggable','true');

        col.addEventListener('dragstart', handleDragStart, false);
        col.addEventListener('dragenter', handleDragEnter, false);
        col.addEventListener('dragover', handleDragOver, false);
        col.addEventListener('dragleave', handleDragLeave, false);
        col.addEventListener('drop', handleDrop, false);
        col.addEventListener('dragend', handleDragEnd, false);
    });