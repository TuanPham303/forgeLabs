function Tab(files=null, tabRef=null){

    this.buttonRef = null;
    this.tabRef = tabRef;

    this.files = files;
    this.fileName = null;

    this.isValid = function(){

        if( !this.files ){
            return false;
        }

        if( this.files.length !== 1){
            alert('You may only upload one file at a time.');
            return false;}

        var filename = this.files[0].name;
        var filename_exploded = filename.split('.');
        var filename_extension = filename_exploded[filename_exploded.length - 1];

        switch (filename_extension.toLowerCase()) {
            case 'stl':
            case 'zip':
            case 'igs':
            case 'stp':
            case 'dwg':
            case 'dxf':
            case 'tgz':
            case 'x_t':
            case 'obj':
            case 'wrl':
            case 'step':
            case 'sldasm':
            case 'slddrw':
            case 'sldprt':
            case 'iges':
            case 'pdf':
            case 'asm':
            case 'rar':
            case 'jpeg':
            case 'png':
                //etc
                return true;
            default:
                return false;
            }

        return false

    }

    this.init = function(callback){

        const button = document.createElement('button');
        button.classList.add('button-default');
        button.classList.add('button-red');

        var text;
        if(this.isValid()){

            this.fileName = this.files[0].name;
            text = document.createTextNode(this.fileName);

        } else {

            text = document.createTextNode('External Link');

        }

        button.appendChild(text);
        button.addEventListener('click', callback);
        this.buttonRef = button;

        document.querySelector('.nav-files').appendChild(button);

    }


    this.initialize = function(files){

        this.files = files;
        this.fileName = this.files[0].name;

        var text;
        if(this.isValid()){
            this.buttonRef.innerText = this.fileName;
            jQuery('.file-uploaded').show();
            jQuery('.upload').hide();
        } else {
            // this.buttonRef.innerText = "Invalid File Type";
            alert('Invalid File Type');
            jQuery('.file-uploaded').hide();
            jQuery('.upload').show();
        }
    }


    // this.init = function(){
    //     const button = document.createElement('button');
    //     button.classList.add('button-default');
    //     button.classList.add('button-red');
    //     text = document.createTextNode("Upload File");
    //     button.appendChild(text);
    //     this.buttonRef = button;

    //     const newOverviewTabFile = document.querySelector('.nav-files').cloneNode(true);
    //     newOverviewTabFile.appendChild(button);
    //     document.querySelector('.m-tabdata').prepend(newOverviewTabFile);
    //     document.querySelector('.nav-files').appendChild(button);
    // }

    this.init();
}
