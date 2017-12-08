function FormController() {
    this.activeTabs = [new Tab()];
    this.curTabIndex = 0;
    this.tabButtons = document.getElementByClass

    this.$drop_zone = null;
    this.$drop_zone_button = null;

    this.unlocked = false;

    this.initialize = function () {

        this.initializeFileUpload();
        this.initializeNavigation();
        this.initializeResponsiveInputs();
        this.initializeCreateTab();
        this.initializeDropdowns();
        this.initializeGridInputs();
        this.detectLink();
        this.submitForm();

    }

    // if link has added to input then unlock the tabs
    this.detectLink = function () {
        jQuery('#text-link').on('blur', () => {
            if (jQuery('#text-link').val() !== '') {
                this.unlocked = true;
                jQuery('.controller span').css('display', 'none'); // Remove Upload Text
                jQuery('.next').css('opacity', '1');
                jQuery('.next').prop('disabled', false);
            } else {
                jQuery('.next').css('opacity', '0.5');
                this.unlocked = false;
            }
        })
    }

    this.initializeFileUpload = function () {

        const controller = this;


        // upload by dragging 
        const isAdvancedUpload = (function () {
            var div = document.createElement('div');
            return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
        })();

        if (isAdvancedUpload) {
            this.$drop_zone = jQuery('#drop_zone')
                .addClass('s-active')
                .on('drag dragstart dragend dragover dragenter dragleave drop', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                })
                .on('dragover dragenter', function (e) {
                    this.classList.add('s-dragover');
                })
                .on('dragleave dragend drop', function (e) {
                    this.classList.remove('s-dragover');
                })
                .on('drop', function (e) {
                    document.querySelector('input[name="stl_file_' + curTabIndex + '"]').files = e.originalEvent.dataTransfer.files;
                });
        }

        this.$drop_zone_button = jQuery('#drop_zone_button');
        this.$drop_zone_button.on('click', function () {
            document.querySelector('input[name="stl_file_' + controller.curTabIndex + '"]').click();
        });


        document.querySelector('input[name="stl_file_' + this.curTabIndex + '"]').addEventListener('change', this.create_tab);
        
        this.isTechnologyChosen();
    }   


    this.initializeNavigation = function () {
        renderNav();
        const controller = this; //controller is window

        jQuery('.nav-form > button').on('click', function (e) {

            e.preventDefault();
            e.stopPropagation();
            // if unlocked if true, we can click to navigate through section
            if (controller.unlocked) {
                jQuery('.view > section').removeClass('s-active');
                jQuery('.view > section').eq(jQuery(this).index()).addClass('s-active');
                jQuery('.nav-form > button').removeClass('s-active');
                jQuery('.nav-form > button').eq(jQuery(this).index()).addClass('s-active');
                jQuery('.nav-form > button:lt(' + (jQuery(this).index() + 1) + ')').addClass('visited'); //Highlight previous steps
            }
            renderNav();


        });


        // If anywhere clicked, check for current nav tab and render nav arrows and nav file
        jQuery('#quoter_form').on('click', 'input[class="output"][type="number"]', '#create_tab', function () {
            renderNav(); 
		});
		jQuery('#quoter_form').on('click', '#create_tab', function () {
            renderNav(); 
		});
		jQuery('#quoter_form').on('click', 'input[class="output"][type="text"]', function () {
            renderNav(); 
		});
		jQuery('#quoter_form').on('click','.fakeTitle', function () {
            renderNav(); 
		});
		jQuery('#quoter_form').on('click','.pencil-icon', function () {
            renderNav(); 
		});


        // Next Button
        jQuery('.next').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (controller.unlocked) {
                jQuery('.view > section.s-active').removeClass('s-active').next().addClass('s-active');
                jQuery('.nav-form > button.s-active').removeClass('s-active').next().addClass('s-active');

                renderNav();

            }
        });

        // Previous Button
        jQuery('.controller .prev').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (controller.unlocked) {
                jQuery('.view > section.s-active').removeClass('s-active').prev().addClass('s-active');
                jQuery('.nav-form > button.s-active').removeClass('s-active').prev().addClass('s-active');
            }
        });

        jQuery('.button-arrow').on('click', function () {
            renderNav();
        })


            
        // Function renderNav renders nav arrows and nav files
        function renderNav() {
            let activeTab;
            let activeTabIndex;

            for (let i = 0; i < jQuery('.nav-form > button').length; i++) {
                if (jQuery('.nav-form > button')[i].classList.contains('s-active')) {
                    activeTab = jQuery('.nav-form > button')[i]
                }
            }
            activeTabIndex = parseInt(activeTab.innerText.charAt(0));
            
            if (activeTabIndex === 2) {
                for (var i = 0; i < this.activeTabs.length; i++) {
                    if (jQuery('#quoter_hidden_form input[name="stl_technology_' + i + '"]:checked').size() === 0) {
                        jQuery('.next').prop('disabled', true);
                        jQuery('.next').css('opacity', '0.5');
                    } else {
						jQuery('.next').prop('disabled', false);
						jQuery('.next').css('opacity', '1');
                    }
                }
            }

            if (activeTabIndex === 3) {
                for (var i = 0; i < this.activeTabs.length; i++) {
                    if (jQuery('#quoter_hidden_form input[name="stl_material_' + i + '"]:checked').size() === 0) {
                        jQuery('.next').prop('disabled', true);
                        jQuery('.next').css('opacity', '0.5');
                    } else {
						jQuery('.next').prop('disabled', false);
						jQuery('.next').css('opacity', '1');
					}
                }
            }

            if (activeTabIndex === 4) {
                for (var i = 0; i < this.activeTabs.length; i++) {
                    if (jQuery('#quoter_hidden_form input[name="stl_quantity_' + i + '"]').val() === '') {
                        jQuery('.next').prop('disabled', true);
                        jQuery('.next').css('opacity', '0.5');
                    } else {
						jQuery('.next').prop('disabled', false);
						jQuery('.next').css('opacity', '1');
					}
                }
            }
            
            if (activeTabIndex === 1) {
                jQuery('.next').css('opacity', '0.5');

                // change arrow button color after uploading 
                document.querySelector('input[name="stl_file_' + this.curTabIndex + '"]').addEventListener('change', function(){
                    jQuery('.next').css('opacity', '1');
                });
                
                //check if there is uploaded item when on page 1 then change arrow button
				if (document.querySelector('input[name="stl_file_' + this.curTabIndex + '"]').value || jQuery('#text-link').val() !== '') {
					jQuery('.next').css('opacity', '1');
					jQuery('.next').prop('disabled', false);
                }
                
                jQuery('.prev').hide();
                jQuery('.controller').css('justify-content', 'flex-end');
            } else {
                jQuery('.prev').show();
                jQuery('.controller').css('justify-content', 'space-between');
            }
            if(activeTabIndex === 5 || activeTabIndex === 1){
                jQuery('.nav-files').hide();
            } else {
                jQuery('.nav-files').show();
            }
            if (activeTabIndex === 5) {
                jQuery('.next').hide();
                jQuery('.nav-files').hide();
            } else {
                jQuery('.next').show();
            }

            jQuery('.nav-form > button:lt(' + activeTabIndex + ')').addClass('visited');
        }



        jQuery('.nav-files').on('click', function (e) {
            if (e.target.tagName === "BUTTON") {
                const index = Array.prototype.indexOf.call(e.currentTarget.children, e.target);
                controller.set_tab_index_to(index);
            }
        });

    }

    this.isTechnologyChosen = function(){
        for (var i = 0; i < this.activeTabs.length; i++) {
            if (jQuery('#quoter_hidden_form input[name="stl_technology_' + i + '"]:checked').size() === 0) {
                jQuery('#page-3-button').prop('disabled', true);
                jQuery('#page-4-button').prop('disabled', true);
                jQuery('#page-5-button').prop('disabled', true);  
                // jQuery('.next').css('opacity', '0.5');           
            } else {
                jQuery('#page-3-button').prop('disabled', false);
                jQuery('#page-4-button').prop('disabled', false);
                jQuery('#page-5-button').prop('disabled', false);
            }
        }
    }

    // set the chosen data after chosing one
    this.initializeResponsiveInputs = function () {

        const controller = this;

        document.getElementById('quoter_form').addEventListener('click', function (e) {
            if (e.target.classList.contains('input-onclick')) {
                //check if on page 5 then detect which tab is clicked to edit
                let currentTab;
                if (jQuery('#page-5-button').hasClass('s-active')) {
                    for (i = 0; i < e.path.length; i++) {
                        if (jQuery(e.path[i]).hasClass('m-tabdata')) {
                            currentTab = e.path[i];
                        }
                    }
                    controller.curTabIndex = currentTab.dataset.tabIndex;
                }

                const input = e.target;
                const inputTarget = document.querySelector('input[name="' + input.dataset.controls + controller.curTabIndex + '"][value="' + input.value + '"]');
                inputTarget.checked = true;

                const output = document.querySelector('button.output[name="' + input.dataset.controls + controller.curTabIndex + '"]');
                output.classList.remove('s-active');
                output.innerText = input.dataset.text;


                //fix bug when editting on overview page, the drop down icon disappear
                const dropDownArrow = jQuery('<i class="fa fa-caret-down drop-down-icon" aria-hidden="true"></i>')[0]

                const clickedEditFieldType = e.target.dataset.controls;
                let clickedEditField;
                for (let i = 0; i < jQuery('.m-tabdata > button').length; i++) {
                    if (jQuery('.m-tabdata > button')[i].getAttribute('name').includes(`${clickedEditFieldType}${controller.curTabIndex}`)) {
                        clickedEditField = jQuery('.m-tabdata > button')[i];
                    }
                }
                jQuery(clickedEditField)[0].append(dropDownArrow);
            }
        });

        document.getElementById('quoter_form').addEventListener('input', function (e) {

            if (e.target.classList.contains('input-oninput')) {

                const input = e.target;
                const inputTarget = document.querySelector('input:not(.output)[name="' + input.dataset.controls + controller.curTabIndex + '"]');
                inputTarget.value = input.value;

                const output = document.querySelector('input.output[name="' + input.dataset.controls + controller.curTabIndex + '"]');
                output.value = input.value;
                
                
            } else if (e.target.classList.contains('input-clientdata')) {

                const input = e.target;
                const inputTarget = document.querySelector('input[name="' + input.dataset.controls + '"]');
                inputTarget.value = input.value;

            }

        });

    }

    this.initializeCreateTab = function () {
        const controller = this;
        document.getElementById('create_tab').addEventListener('click', function () {
            jQuery('#text-link').val('');
            jQuery('#project-input').val('');
            jQuery('#quantity-input').val('');
            if (!controller.is_form_valid()) { return false; }
            controller.create_tab();
            jQuery('.upload').show();
            jQuery('.file-uploaded').hide();

            // deactivate button 3 4 5 when make new item
            jQuery('#page-3-button').prop('disabled', true);
            jQuery('#page-4-button').prop('disabled', true);
            jQuery('#page-5-button').prop('disabled', true);
        });

    }


    this.initializeDropdowns = function () {
        const controller = this;

        document.getElementById('m-tabdata-container').addEventListener('click', function (e) {
            try {
                // determine which tab is active
                var selectedTab;
                for (var i = 0; i < e.path.length; i++) {
                    if (e.path[i].classList.contains("m-tabdata")) {
                        selectedTab = e.path[i];
                        break;
                    }
                }


                const index = Array.prototype.indexOf.call(this.children, selectedTab);
                // drop down the list if clicked the button with class 'output'
                if (e.target.tagName === "BUTTON" && e.target.classList.contains('output')) {
                    e.target.classList.toggle('s-active');
                }
                if (e.target.classList.contains('drop-down-icon')) {
                    e.target.parentElement.classList.toggle('s-active');
                }

                //remove all the s-active class is click the project due and about project area then come back to the according page to update info
                if (e.target.tagName === "INPUT" || e.target.classList.contains('pencil-icon')) {
                    e.preventDefault();
                    controller.set_tab_index_to(index)
                    jQuery('.nav-form > button').removeClass('s-active');
                    jQuery('.nav-form > button').eq(3).addClass('s-active');
                    jQuery('.view > section').removeClass('s-active');
                    jQuery('.view > section').eq(3).addClass('s-active');
                }
            } catch (e) { }
        }, true);
    }

    // detect which option is chosen in tab 2 and 3
    this.initializeGridInputs = function () {

        jQuery('.grid-technologies > label').on('click', function (e) {
            jQuery('.grid-technologies > label').removeClass('s-active');
            jQuery(this).addClass('s-active'); 
            
            //unlock page 3 after choosing technology
            jQuery('#page-3-button').prop('disabled', false);

            // unlock next arrow button after choosing technology
            jQuery('.next').prop('disabled', false); 
            jQuery('.next').css('opacity', '1');        
        });

        jQuery('.grid-materials').on('click', 'label', function () {
            //unlock page 4 after choosing material
            jQuery('#page-4-button').prop('disabled', false);
              
            // unlock next arrow button after choosing material
            jQuery('.next').prop('disabled', false);
            jQuery('.next').css('opacity', '1');       
        });

        jQuery('#quantity-input').on('input', function(){
            if (jQuery('#quantity-input').val() !== ''){
                //unlock page 5 after filling in quantity
                jQuery('#page-5-button').prop('disabled', false);
            
                // unlock next arrow button after filling in quantity
                jQuery('.next').prop('disabled', false); 
                jQuery('.next').css('opacity', '1'); 
            }
        })
    }


    this.updateOnChangeValues = function () {
        if (jQuery('#quoter_hidden_form input[name="stl_technology_' + this.curTabIndex + '"]:checked').size() > 0) {
            const grid_technology_index = (jQuery('#quoter_hidden_form input[name="stl_technology_' + this.curTabIndex + '"]:checked').index() - 1);
            jQuery('.grid-technologies > label').removeClass('s-active');
            jQuery('.grid-technologies > label').eq(grid_technology_index).addClass('s-active');
        } else {
            jQuery('.grid-technologies > label').removeClass('s-active');
        }

        if (jQuery('#quoter_hidden_form input[name="stl_material_' + this.curTabIndex + '"]:checked').size() > 0) {
            const grid_material_index = (jQuery('#quoter_hidden_form input[name="stl_material_' + this.curTabIndex + '"]:checked').index() - 25);
            jQuery('.grid-materials > label').removeClass('s-active');
            jQuery('.grid-materials > label').eq(grid_material_index).addClass('s-active');
        } else {
            jQuery('.grid-materials > label').removeClass('s-active');
        }
		const description = document.querySelector('input:not(.output)[name="stl_description_' + this.curTabIndex + '"]');
        const quantity = document.querySelector('input:not(.output)[name="stl_quantity_' + this.curTabIndex + '"]');

		if (description) {
            document.getElementById('project-input').value = description.value;
		}
		if (quantity) {
            document.getElementById('quantity-input').value = quantity.value;
        }
        this.createFakeTitle()
    }

    //make a clone of the file title in each tab from the .nav-files
    this.createFakeTitle = function () {
        const realFileTitles = jQuery('.nav-files')[0].children;
        let realFileTitlesArray = [];
        for (let i = 0; i < realFileTitles.length; i++) {
            realFileTitlesArray.push(`${jQuery('.nav-files')[0].children[i].innerText}`)
        }

        let arrayOfTabs = jQuery('.m-tabdata');
        for (let i = 0; i < arrayOfTabs.length; i++) {
            arrayOfTabs[i].children[0].innerText = realFileTitlesArray[i]
        }

        //bind fake title to real title
        let clickedTabIndex = 0;
        jQuery('.fakeTitle').click(function (e) {
            clickedTabIndex = jQuery(e.currentTarget).parent()[0].dataset.tabIndex;
            realFileTitles[clickedTabIndex].click();
        })
    }

    this.create_tab = (function (event) {
		
        var files = null;
        if (event) {
            files = event.target.files;
            var tab = this.activeTabs[this.curTabIndex];
            tab.initialize(files);
            this.set_tab_index_to(this.activeTabs.length - 1);
        } else {
            var tab = new Tab();
            this.activeTabs.push(tab);
            this.set_tab_index_to(this.activeTabs.length - 1);
            this.create_tab_inputs();
        }

    }).bind(this)


    this.create_tab_inputs = function (event) {

        const newFormNode = document.querySelector('#quoter_hidden_form > .part').cloneNode(true);

        for (var i = 0; i < newFormNode.children.length; i++) {
            const newName = newFormNode.children[i].name.slice(0, -1);
            newFormNode.children[i].name = newName + this.curTabIndex.toString();

            if (newFormNode.children[i].type === "radio") {
                newFormNode.children[i].checked = false;
            }
            if (newFormNode.children[i].type === "file") {
                newFormNode.children[i].addEventListener('change', this.create_tab);
                newFormNode.children[i].value = null;
			}  
			if (newFormNode.children[i].type === "number") {
                newFormNode.children[i].value = '';
			}  
			if (newFormNode.children[i].type === "text") {
                newFormNode.children[i].value = '';
            }   
        }
        document.getElementById('quoter_hidden_form').appendChild(newFormNode);

        //make an array of all the file name from the already existed title div then render a new one in each item
        const newOverviewTabNode = document.querySelector('.m-tabdata').cloneNode(true);

        newOverviewTabNode.setAttribute('data-tab-index', this.curTabIndex.toString());
        for (var j = 0; j < newOverviewTabNode.children.length; j++) {
            if (newOverviewTabNode.children[j].classList.contains('output')) {
                const newName = newOverviewTabNode.children[j].name.slice(0, -1);
                newOverviewTabNode.children[j].name = newName + this.curTabIndex.toString();
            }
            //the quantity and detail inputs are wraped in another div so have to go deeper in the DOM
            if (newOverviewTabNode.children[j].classList.contains('overviewInputWrap')) {
                for(let i = 0; i < newOverviewTabNode.children[j].children.length; i++){
                    if(newOverviewTabNode.children[j].children[i].classList.contains('output')){
                        const newName = newOverviewTabNode.children[j].children[i].name.slice(0, -1);
                        newOverviewTabNode.children[j].children[i].name = newName + this.curTabIndex.toString();
                    }
                }
            }
            if (newOverviewTabNode.children[j].tagName === "BUTTON") {
                newOverviewTabNode.children[j].innerText = "Click To Select"
            }
        }
        document.getElementById('m-tabdata-container').appendChild(newOverviewTabNode);

    }



    this.set_tab_index_to = function (index) {
        this.curTabIndex = index;
        jQuery('.view > section').removeClass('s-active');
        jQuery('.view > section').eq(0).addClass('s-active');
        jQuery('.nav-form > button').removeClass('s-active');
        jQuery('.nav-form > button').eq(0).addClass('s-active');
        jQuery('.nav-files > button').removeClass('s-active');
        jQuery('.nav-files > button').eq(index).addClass('s-active');

        if (this.activeTabs[curTabIndex] && this.activeTabs[curTabIndex].isValid() || jQuery('#text-link').val() !== '') {
            this.unlocked = true;
            jQuery('.controller span').css('display', 'none'); // Remove Upload Text
        } else {
            this.unlocked = false;
        }
        this.updateOnChangeValues();
    }

    this.submitForm = function(){
        jQuery('#submit_form').on('click', (e) => {
            if (this.is_form_valid() && this.is_customer_valid()){
                jQuery('#hiddenSubmitButton').trigger('click');
                jQuery('.loader').show();
            }
        })            
    }


    this.is_form_valid = function () {

        for (var i = 0; i < this.activeTabs.length; i++) {
            if (jQuery('#quoter_hidden_form input[name="stl_technology_' + i + '"]:checked').size() === 0) {
                alert('Technology must be selected for all parts before continuing.');
                return false;
            }

            if (jQuery('#quoter_hidden_form input[name="stl_material_' + i + '"]:checked').size() === 0) {
                alert('Material must be selected for all parts before continuing.');
                return false;
            }
            if (jQuery('#quoter_hidden_form input[name="stl_quantity_' + i + '"]').val() === '') {
                alert('Quantity must be provided for all parts before continuing.');
                return false;
            }

            // if (jQuery('#quoter_hidden_form input[name="stl_description_' + i + '"]').val() === "") {
            //     alert('Description must be added for all parts before continuing.');
            //     return false;
            // }

            // if (jQuery('#quoter_hidden_form input[name="stl_date_' + i + '"]').val() === "") {
            //     alert('Project due date must be added for all parts before continuing.');
            //     return false;
            // }
        }

        return true;

    }

    this.is_customer_valid = function(){
        const LNAME = document.querySelector('#quoter_hidden_form input[name="LNAME"]');
        const EMAIL = document.querySelector('#quoter_hidden_form input[name="EMAIL"]');
        const PHONE = document.querySelector('#quoter_hidden_form input[name="PHONE"]');
        const FNAME = document.querySelector('#quoter_hidden_form input[name="FNAME"]');

        if (FNAME.value == "") {
            alert('First name field can not be empty');
            return false;
        }
        if (LNAME.value == "") {
            alert('Last name field can not be empty');
            return false;
        }
        if (EMAIL.value == "") {
            alert('Email field can not be empty');
            return false;
        }
        if (PHONE.value == "") {
            alert('Phone number field can not be empty');
            return false;
        }

        return true;
    }


    this.initialize();


}

const formController = FormController();







