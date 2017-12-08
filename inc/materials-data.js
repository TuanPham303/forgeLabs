const materialsData = {
  'Polyjet Matrix': {
    'VeroWhite': {
      'row1': ['ASTM D 638', 'ASTM D 638', 'ASTM D 638', 'ASTM D 790', 'ASTM D 790', 'ASTM D 256', 'Shore D', 'ASTM D 648'],
      'row2': ['50-65', '2000-3000', '10-25', '75-110', '2200-3200', '20-30', '83-86', '45-50'],
      'type': 'General Purpose Material',
      'description': 'Excellent detail visualization in gray, black, white and blue. You can 3D print accurate, attractive prototypes that test fit, form and function, even for moving and assembled parts. You can also produce smooth, accurate jigs, fixtures and manufacturing tooling; the blue shade is ideal for silicon molding.',
      'datasheet': 'http://usglobalimages.stratasys.com/Main/Files/Material_Spec_Sheets/MSS_PJ_PJMaterialsDataSheet.pdf?v=635785205440671440'
    },
    'VeroClear': {
      'row1': ['ASTM D 638', 'ASTM D 638', 'ASTM D 638', 'ASTM D 790', 'ASTM D 790', 'ASTM D 256', 'Shore D', 'ASTM D 648'],
      'row2': ['50-65', '2000-3000', '15-25', '80-110', '2700-3300', '20-30', '83-86', '45-50'],
      'type': 'General Purpose Material',
      'description': 'Transparent material (VeroClear-RGD810) is a rigid, nearly colorless material featuring proven dimensional stability for general purpose, fine-detail model building and visual simulation of transparent thermoplastics such as PMMA.',
      'datasheet': 'http://usglobalimages.stratasys.com/Main/Files/Material_Spec_Sheets/MSS_PJ_PJMaterialsDataSheet.pdf?v=635785205440671440'
    },
    'TangoBlack / Agilus30': {
      'row1': ['ASTM D 638', 'ASTM D-395', 'ASTM D 638', 'ASTM D-624', 'ASTM D792', 'ASTM D 256', 'Shore D', 'ASTM D 648'],
      'row2': ['0.8-1.5', '4-5', '170-220', '2-4', '1.12-1.13', 'N/A', '27-95', 'N/A'],
      'type': 'General Purpose Material',
      'description': 'The new Agilus30 rubber-like material provides superior elongation, tear resistance and flexibility for the most demanding applications requiring repeated flexing and bending. Similar to TangoBlack, this material can also be combined with rigid polymers to provide shore values between A30 – A95.',
      'datasheet': 'http://usglobalimages.stratasys.com/Main/Files/Material_Spec_Sheets/MSS_PJ_PJMaterialsDataSheet.pdf?v=635785205440671440'
    },
    'Digital ABS': {
      'row1': ['ASTM D 638', 'ASTM D 638', 'ASTM D 638', 'ASTM D 790', 'ASTM D 790', 'ASTM D 256', 'Shore D', 'ASTM D 648'],
      'row2': ['55-60', '2600-3000', '25-40', '65-75', '1700-2200', '65-80', '85-87', '82-90'],
      'type': 'Special Application Material',
      'description': 'Digital ABS (fabricated inside the 3D printer from RGD515 and RGD535) is designed to simulate standard ABS plastics by combining high-temperature resistance with toughness.',
      'datasheet': 'http://usglobalimages.stratasys.com/Main/Files/Material_Spec_Sheets/MSS_PJ_PJMaterialsDataSheet.pdf?v=635785205440671440'
    },
    'High Tempurature (RGD525)': {
      'row1': ['ASTM D 638', 'ASTM D 638', 'ASTM D 638', 'ASTM D 790', 'ASTM D 790', 'ASTM D 256', 'Shore D', 'ASTM D 648'],
      'row2': ['70-80', '3200-3500', '10-15', '110-130', '3100-3500', '14-16', '87-88', '63-80'],
      'type': 'Special Application Material',
      'description': 'Polyjet High Temperature Material provides both heat resistance, exceptional dimensional stability and a beautiful surface finish. The material can withstand up 80°C  to simulate the thermal performance of engineering plastics. This material is ideal for testing applications such as hot-air flow or hot-water flow in pipes and faucets.',
      'datasheet': 'http://usglobalimages.stratasys.com/Main/Files/Material_Spec_Sheets/MSS_PJ_PJMaterialsDataSheet.pdf?v=635785205440671440'
    },
    'Simulated Polypropylene (Rigur)': {
      'row1': ['ASTM D 638', 'ASTM D 638', 'ASTM D 638', 'ASTM D 790', 'ASTM D 790', 'ASTM D 256', 'Shore D', 'ASTM D 648'],
      'row2': ['40-45', '1700-2100', '20-35', '30-40', '1500-1700', '30-35', '80-84', '45-54'],
      'type': 'Special Application Material',
      'description': 'Simulated Polypropylene material provides both durability along with a beautiful surface finish. Ideal for quickly creating prototypes for snap-fit components, living hinges and other high fatigue and demanding applications.',
      'datasheet': 'http://usglobalimages.stratasys.com/Main/Files/Material_Spec_Sheets/MSS_PJ_PJMaterialsDataSheet.pdf?v=635785205440671440'
    },
  },
  'Stereolithography': {
    'Accura Xtreme White (ABS-like)': {
    },
    'Accura 25 (Polypropylene-like)': {
      'description': 'Investment casting, fit validation and concept models. The lowest cost option for high detail resin based prints'
    },
    'Accura ClearVue (Transparent)': {
    }
  },
  'Fused Deposition Modeling': {
    'ABS / ASA': {
      'row1': ['ASTM D 638', 'ASTM D 638', 'ASTM D 638', 'ASTM D 790', 'ASTM D 790', 'ASTM D 256', 'ASTM D 648'],
      'row2': ['33', '2200', '6', '58/35', '2100/1650', '106', '82'],
      'type': 'General Purpose Material',
      'description': 'ABS-M30 is ideal for concept models and moderate-requirement parts including functional prototypes, jigs, fixtures, manufacturing tooling and production parts.',
      'datasheet': 'http://usglobalimages.stratasys.com/Main/Files/Material_Spec_Sheets/MSS_FDM_ABSM30.pdf?v=635784474569678457'
    },
    'Nylon-12': {
      'row1': ['ASTM D 638', 'ASTM D 638', 'ASTM D 638', 'ASTM D 790', 'ASTM D 790', 'ASTM D 256', 'ASTM D 648'],
      'row2': ['46/38.5', '1282/1138', '30/5.4', '67/61', '1276/1180', '135/53', '82'],
      'type': 'Special Application Material',
      'description': 'The toughest in the industry, exhibiting 100-300 percent better elongation at break and superior fatigue resistance over any other additive manufacturing technology. Nylon offers the best Z-axis lamination and highest impact strength of any FDM thermoplastic, as well as excellent chemical resistance.',
      'datasheet': 'http://usglobalimages.stratasys.com/Main/Files/Material_Spec_Sheets/MSS_FDM_ABSM30.pdf?v=635784474569678457'
    },
    'Polycarbonate': {
      'row1': ['ASTM D 638', 'ASTM D 638', 'ASTM D 638', 'ASTM D 790', 'ASTM D 790', 'ASTM D 256', 'ASTM D 648'],
      'row2': ['57/30', '1944/1958', '4.8/2.5', '89/59', '2006/1800', '106', '127'],
      'type': 'Special Application Material',
      'description': 'PC’s high tensile and flexural strength make it ideal for demanding prototyping needs, tooling and fixtures, and patterns for metal bending and composite work. Low-volume manufacturing and customization become feasible, and testing provides more confidence.',
      'datasheet': 'http://usglobalimages.stratasys.com/Main/Files/Material_Spec_Sheets/MSS_FDM_PC.pdf'
    },
    'ULTEM 9085': {
      'type': 'Special Application Material',
      'description': 'ULTEM 9085 is an FDM thermoplastic ideal for aerospace, automotive and military applications because of its FST rating, high strength-to-weight ratio and existing certifications. It empowers design and manufacturing engineers to 3D print advanced functional prototypes and production parts. – See more at: http://www.stratasys.com/materials/fdm/ultem-9085#sthash.ufHy9elu.dpuf',
      'datasheet': 'http://usglobalimages.stratasys.com/Main/Files/Material_Spec_Sheets/MSS_FDM_ULTEM9085.pdf'
    },
    'PC-ABS': {

    },
    'Nylon-12CF': {

    },
    'PC-ISO': {

    },
    'ULTEM 1010': {

    },
  },
  'Selective Laser Sintering': {
    'Duraform PA (Nylon)': {
      'type': 'Special Application Material',
      'description': 'Durable nylon material with excellent surface resolution and feature detail. Easily machinable and paintable to create demonstration parts.',
      'datasheet': 'http://www.3dsystems.com/sites/www.3dsystems.com/files/DS_DuraForm_PA_US.pdf'
    },
    'Duraform GF (Glass Filled Nylon)': {
    }
  },
  'Colour Jet 3D Printing': {
    'Visijet - PXL': {
      'type': 'Special Application Material',
      'description': 'Full colour CMYK 3D printing technology capable of portraying over 360 thousand different colour combinations. Ideal for architectural models and visual concept models.',
      'datasheet': 'http://www.3dsystems.com/sites/www.3dsystems.com/files/cjp_brochure_0316_usen_web_1.pdf'
    }
  },
  'Metal 3D Printing (Coming 2018)' : {
    'Stainless Steel 17-4PH (Coming Soon)': {

    },
    'Kovar (Coming Soon)': {

    },
    'Copper (Coming Soon)': {

    },
    'AISI 4140 (Coming Soon)': {

    }
  }
}

