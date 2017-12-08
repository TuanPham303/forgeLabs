jQuery(document).ready(function ($) {

  // ON SELECT A TECHNOLOGY
  $('.grid-technologies > label').click(function () {
    const gridTechnologies = $('.grid-technologies > label');
    // update technology name on CHOOSE MATERIAL page
    gridTechnologies.each(function () {
      if ($(this).hasClass('s-active')) {
        const technology = $(this).text().trim();
        $('.selected-technology').empty();
        $('.selected-technology').append(technology);
        changeDropdownMaterials(technology);
      }
    })

    // AFTER technology has been selected
    $('.grid-materials').empty();
    for (let tech in materialsData) {
      const selectedTech = $('.selected-technology').text();
      if (tech === selectedTech && tech !== 'Metal 3D Printing (Coming 2018)') {
        for (let mat in materialsData[tech]) {
          const matLowercase = mat.toLowerCase().replace(/\s+/g, '').replace(/\/+/g, '');

          const label = `
          <label>
            <div class="input-container">
                <input class="input-tab input-onclick" data-controls="stl_material_" data-text="${mat}" type="image" value=${matLowercase} src="http://forgelabs.ca/wp-content/themes/x/assets/${matLowercase}.png">
            </div>
            <div class="input-name">
                <p>${mat}</p>
                <button onClick="openAbout()">Details <i class="fa-question-circle fa" aria-hidden="true"></i></button>
            </div>
          </label>
          `
          $('.grid-materials').append(label);
        }
      }
    }

    $('.grid-materials > label').click(function () {
      $('.grid-materials > label').removeClass('s-active');
      $(this).addClass('s-active');
    });

    // ON SELECT A MATERIAL ABOUT 
    $('.input-name > button').click(function () {
      const selectedTech = $('.selected-technology').text();
      const selectedMat = $(this).prev().text();
      for (let tech in materialsData) {
        if (tech === selectedTech) {
          const techName = tech.toUpperCase();

          $('.table-row1').empty();
          $('.table-row2').empty();

          // Technology Name
          $('#about-container > p:first').empty();
          $('#about-container > p:first').text(`${techName}`);
          for (mat in materialsData[tech]) {
            if (mat === selectedMat) {
              const matLowercase = mat.toLowerCase().replace(/\s+/g, '').replace(/\/+/g, '');
              const row1 = materialsData[tech][mat]['row1'];
              const row2 = materialsData[tech][mat]['row2'];
              const type = materialsData[tech][mat]['type'];
              const description = materialsData[tech][mat]['description'];
              const datasheet = materialsData[tech][mat]['datasheet'];
              // empty ALL about-text data
              $('.about-text > p').empty();
              // Material Name
              $('.about-text > p:first').text(mat);
              // If type data is valid, show type
              if (type) {
                $('.about-text > p:nth-child(2)').append(`<strong>${type}</strong>`);
              }
              // If description data is valid
              if (description) {
                $('.about-text > p:last').text(description);
              }
              $('.about-img > img').attr('src', `http://forgelabs.ca/wp-content/themes/x/assets/${matLowercase}.png`);
              // If rows data is valid
              $('.table-titles').empty();
              if (row1) {
                if (row1.length === 7) {
                  $('.table-titles').append(`
                  <p>Tensile Strength (MPa/PSI)</p>
                  <p>Modulus of Elasticity (MPa/KSI)</p>
                  <p>Elongation at Break (%)</p>
                  <p>Flexural Strength (MPa/PSI)</p>
                  <p>Flexural Modulus (MPa/KSI)</p>
                  <p>Impact Strength (J/m /Ft-lbs/in)</p>
                  <p>Heat Deflection Temperature</p>
                  `).removeClass('eight-col').addClass('seven-col');
                  $('.table-row1').removeClass('eight-col').addClass('seven-col');
                  $('.table-row2').removeClass('eight-col').addClass('seven-col');
                }
                else if (row1.length === 8) {
                  $('.table-titles').append(`
                  <p>Tensile Strength (MPa/PSI)</p>
                  <p>Modulus of Elasticity (MPa/KSI)</p>
                  <p>Elongation at Break (%)</p>
                  <p>Flexural Strength (MPa/PSI)</p>
                  <p>Flexural Modulus (MPa/KSI)</p>
                  <p>Impact Strength (J/m /Ft-lbs/in)</p>
                  <p>Hardness</p>
                  <p>Heat Deflection Temperature</p>
                  `).removeClass('seven-col').addClass('eight-col');
                  $('.table-row1').removeClass('seven-col').addClass('eight-col');
                  $('.table-row2').removeClass('seven-col').addClass('eight-col');
                }
                row1.forEach((rowItem) => {
                  $('.table-row1').append(`<p>${rowItem}</p>`)
                });
                row2.forEach((rowItem) => {
                  $('.table-row2').append(`<p>${rowItem}</p>`)
                });
              }
              // Empty datasheet
              $('.about-footer > a').attr('href', '');
              $('.about-footer > a').attr('href', datasheet);
              // If datasheet data is not valid
              $('.about-footer > a').attr('href', '').empty();
              if (datasheet) {
                $('.about-footer > a').attr('href', datasheet).text('View Material Specification Sheet');
              }
            }
          }
        }
      }

      $('.about-select-btn').click(function () {
        const gridMaterials = $('.grid-materials > label');
        gridMaterials.each(function (idx) {
          if ($(gridMaterials[idx]).hasClass('s-active')) {
            $(this).trigger('click');
            $('#about-container > .about-x > button').trigger('click');
          }
        });
      });
    });
  });

  // OPEN DATASHEET LINK IN NEW TAB
  $('.about-footer > a').click(function () {
    $(this).attr('target', '_blank');
    window.open($(this).attr('href'));
    return false;
  });

  // OVERVIEW PAGE

  $('#m-tabdata-container').on('click', '.m-tabdata', function (e) {
    
    if ($(e.target).hasClass('input-onclick')){
      const techDataText = $(e.target)[0].innerText;
      const currentEdittingTab = $(e.target).parentsUntil('.m-tabdata-container')[2].children[6].children[0];
      jQuery(currentEdittingTab).empty();
      switch (techDataText) {
        case 'Polyjet Matrix':
        jQuery(currentEdittingTab).append(`
        <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="verowhite" data-text="VeroWhite">VeroWhite</button>
        <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="veroclear" data-text="VeroClear">VeroClear</button>
        <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="tangoblackagilus30" data-text="TangoBlack / Agilus30">TangoBlack / Agilus30</button>
        <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="digitalabs" data-text="Digital ABS">Digital ABS</button>
        <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="hightempurature(rgd525)" data-text="High Tempurature (RGD525)">High Temperature (RGD525)</button>
        <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="simulatedpolypropylene(rigur)" data-text="Simulated Polypropylene (Rigur)">Simulated Polypropylene (Rigur)</button>
        `);
        break;
      case 'Stereolithography':
        jQuery(currentEdittingTab).append(`
        <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="accuraxtremewhite" data-text="Accura Xtreme White">Accura Xtreme White</button>
        <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="accura25" data-text="Accura 25">Accura 25</button>
        <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="accuraclearvue" data-text="Accura ClearVue">Accura ClearVue</button>
        `);
        break;
      case 'Fused Deposition Modeling':
        jQuery(currentEdittingTab).append(`
        <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="absasa" data-text="ABS / ASA">ABS / ASA</button>
        <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="nylon-12" data-text="Nylon-12">Nylon-12</button>
        <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="polycarbonate" data-text="Polycarbonate">Polycarbonate</button>
        <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="ultem9085" data-text="ULTEM 9085">ULTEM 9085</button>
        <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="pc-abs" data-text="PC-ABS">PC-ABS</button>
        <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="nylon-12cf" data-text="Nylon-12CF">Nylon-12CF</button>
        <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="pc-iso" data-text="PC-ISO">PC-ISO</button>
        <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="ultem1010" data-text="ULTEM 1010">ULTEM 1010</button>
        `);
        break;
      case 'Selective Laser Sintering':
        jQuery(currentEdittingTab).append(`
        <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="duraformpa" data-text="Duraform PA">Duraform PA</button>
        <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="duraformgf" data-text="Duraform GF">Duraform GF</button>            
        `);
        break;
      case 'Colour Jet 3D Printing':
        jQuery(currentEdittingTab).append(`
        <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="visijet-pxl" data-text="Visijet - PXL">Visijet - PXL</button>          
        `);
        break;
      // case 'Metal 3D Printing (Coming 2018)':
      //   jQuery(currentEdittingTab).append(`
      //   <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="stainlesssteel17-4PH" data-text="Stainless Steel 17-4PH">Stainless Steel 17-4PH</button>
      //   <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="kovar" data-text="Kovar">Kovar</button>
      //   <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="copper" data-text="Copper">Copper</button>
      //   <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="aisi4140" data-text="AISI 4140">AISI 4140</button>          
      //   `);
      //   break;
      default:
        return;
      }
    }
  });
});

function changeDropdownMaterials(tech) {

  const matDropdown = jQuery('.material-dropdown > ul');  

  jQuery(matDropdown).empty();
  switch (tech) {
    case 'Polyjet Matrix':
    jQuery(matDropdown).append(`
    <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="verowhite" data-text="VeroWhite">VeroWhite</button>
    <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="veroclear" data-text="VeroClear">VeroClear</button>
    <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="tangoblackagilus30" data-text="TangoBlack / Agilus30">TangoBlack / Agilus30</button>
    <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="digitalabs" data-text="Digital ABS">Digital ABS</button>
    <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="hightempurature(rgd525)" data-text="High Tempurature (RGD525)">High Temperature (RGD525)</button>
    <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="simulatedpolypropylene(rigur)" data-text="Simulated Polypropylene (Rigur)">Simulated Polypropylene (Rigur)</button>
    `);
    break;
  case 'Stereolithography':
    jQuery(matDropdown).append(`
    <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="accuraxtremewhite" data-text="Accura Xtreme White">Accura Xtreme White</button>
    <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="accura25" data-text="Accura 25">Accura 25</button>
    <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="accuraclearvue" data-text="Accura ClearVue">Accura ClearVue</button>
    `);
    break;
  case 'Fused Deposition Modeling':
    jQuery(matDropdown).append(`
    <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="absasa" data-text="ABS / ASA">ABS / ASA</button>
    <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="nylon-12" data-text="Nylon-12">Nylon-12</button>
    <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="polycarbonate" data-text="Polycarbonate">Polycarbonate</button>
    <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="ultem9085" data-text="ULTEM 9085">ULTEM 9085</button>
    <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="pc-abs" data-text="PC-ABS">PC-ABS</button>
    <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="nylon-12cf" data-text="Nylon-12CF">Nylon-12CF</button>
    <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="pc-iso" data-text="PC-ISO">PC-ISO</button>
    <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="ultem1010" data-text="ULTEM 1010">ULTEM 1010</button>
    `);
    break;
  case 'Selective Laser Sintering':
    jQuery(matDropdown).append(`
    <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="duraformpa" data-text="Duraform PA">Duraform PA</button>
    <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="duraformgf" data-text="Duraform GF">Duraform GF</button>            
    `);
    break;
  case 'Colour Jet 3D Printing':
    jQuery(matDropdown).append(`
    <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="visijet-pxl" data-text="Visijet - PXL">Visijet - PXL</button>          
    `);
    break;
  // case 'Metal 3D Printing (Coming 2018)':
  //   jQuery(matDropdown).append(`
  //   <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="stainlesssteel17-4PH" data-text="Stainless Steel 17-4PH">Stainless Steel 17-4PH</button>
  //   <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="kovar" data-text="Kovar">Kovar</button>
  //   <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="copper" data-text="Copper">Copper</button>
  //   <button class="input-tab input-onclick" data-controls="stl_material_" type="image" value="aisi4140" data-text="AISI 4140">AISI 4140</button>          
  //   `);
  //   break;
  default:
    return;
  }
}

function openAbout() {
  document.getElementById('about-overlay').style.display = 'flex';
}

function closeAbout() {
  document.getElementById('about-overlay').style.display = 'none';
}