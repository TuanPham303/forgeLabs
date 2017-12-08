<section id = 'page-5' class="form-section">
   
    <div id="m-tabdata-container">
        <div class="m-tabdata" data-tab-index="0">
            <div class="fakeTitle" data-fake-title-index="0">External Link</div>
            <p>Technology</p>

            <button class="output" name="stl_technology_0">
                Click To Select
                <i class="fa fa-caret-down drop-down-icon" aria-hidden="true"></i>
            </button>
            <div class="m-dropdown technology-dropdown">
                <ul>                            
                    <button class="input-tab input-onclick" data-controls="stl_technology_" value="polyjet_matrix" data-text="Polyjet Matrix">Polyjet Matrix</button>
                    <button class="input-tab input-onclick" data-controls="stl_technology_" value="stereolithography" data-text="Stereolithography">Stereolithography</button>
                    <button class="input-tab input-onclick" data-controls="stl_technology_" value="fused_deposition_modeling" data-text="Fused Deposition Modeling">Fused Deposition Modeling</button>
                    <button class="input-tab input-onclick" data-controls="stl_technology_" value="selective_laser_sintering" data-text="Selective Laser Sintering">Selective Laser Sintering</button>
                    <button class="input-tab input-onclick" data-controls="stl_technology_" value="colour_jet_printing" data-text="Colour Jet 3D Printing">Colour Jet 3D Printing</button>
                </ul>
            </div>
            
            <p>Material</p>

            <button class="output material-output" name="stl_material_0">
                Click To Select
                <i class="fa fa-caret-down drop-down-icon" aria-hidden="true"></i>
            </button>
            <div class="m-dropdown material-dropdown">
                <ul>
                </ul>
            </div>
            
            <p>About this project:</p>
            <div class="overviewInputWrap">
                <input class="output" type="text" name="stl_description_0"/>
                <i class="fa fa-pencil pencil-icon" aria-hidden="true"></i>
            </div>
            <p>Quantity:</p>
            <div class="overviewInputWrap">
                <input class="output" type="number" name="stl_quantity_0"/>
                <i class="fa fa-pencil pencil-icon" aria-hidden="true"></i>
            </div>

        </div>
     
    </div>
    
    <button class="button-default button-form" id="create_tab">Add Another Part</button>
    <div class="customer-info">
        <div class="phone-and-email">
            <div class="emailAndPhoneWrap margin-right-10-px">
            <input class="input-clientdata" data-controls="EMAIL" placeholder="Email*" type="email" id='client-email'>
            <div class='email-alert'></div>
            </div>
            <div class="emailAndPhoneWrap">
            <input class="input-clientdata" data-controls="PHONE" placeholder="Phone*" type="tel" id='phone-number'>
            <div class="phone-alert"></div>
            </div> 
        </div>
        <div class="name">
            <input class="input-clientdata client-name margin-right-10-px" data-controls="FNAME" placeholder="First Name*" type="text">
            <input class="input-clientdata client-name" data-controls="LNAME" placeholder="Last Name*" type="text">
        </div>
    </div>
    <button class="button-default button-form" id="submit_form">Submit Request</button>

</section>
