interface VehicleSchemaProps {
  model: "xt4" | "xt6";
}

export function VehicleSchema({ model }: VehicleSchemaProps) {
  const isXT4 = model === "xt4";
  
  const vehicleName = isXT4 
    ? "EVolution D-MAX XT4 4X4 Electric Golf Cart" 
    : "EVolution D-MAX XT6 4X4 Electric Golf Cart";
  
  const vehicleDescription = isXT4
    ? "The EVolution D-MAX XT4 is a premium 4-passenger electric golf cart featuring on-demand 4-wheel drive, dual 6.3kW AC motors, 10.1-inch touchscreen with Apple CarPlay and Android Auto, 24-speaker surround sound, and luxury amenities. Street-legal LSV ready with top speed of 25 MPH and 40-50 mile range."
    : "The EVolution D-MAX XT6 is a premium 6-passenger electric golf cart featuring selectable 4×2/4×4 drive system, dual 6.3kW AC motors, 10.1-inch touchscreen with Apple CarPlay and Android Auto, LED speakers, and luxury amenities. Street-legal LSV ready with top speed of 25 MPH and 30-50 mile range.";

  const price = isXT4 ? "15595" : "17595";
  const seating = isXT4 ? "4" : "6";
  const range = isXT4 ? "40-50 miles" : "30-50 miles";
  const url = isXT4 ? "/evolution-d-max-xt4" : "/evolution-d-max-xt6";

  const colors = [
    { name: "White", hex: "#FFFFFF" },
    { name: "Black", hex: "#1a1a1a" },
    { name: "Blue", hex: "#1e40af" },
    { name: "Gray", hex: "#6b7280" },
    { name: "Red", hex: "#dc2626" },
    { name: "Sky Blue", hex: "#38bdf8" },
  ];

  const standardFeatures = [
    "10.1\" Touchscreen Display with Apple CarPlay",
    "10.1\" Touchscreen Display with Android Auto",
    isXT4 ? "Premium 24-Speaker Surround Sound System" : "Premium Integrated Sound System with LED Lighting",
    "Dual Wireless Phone Charging Pads",
    "Built-In Dash Refrigerator",
    isXT4 ? "74-Qt Portable Cooler" : "Portable Cooler",
    "Sliding Rear Utility Tray",
    "Foldable Rear Storage Basket",
    "Golf Bag Rack",
    "Foldable Windshield with Sliding Vents",
    "LED Headlights",
    "LED Taillights",
    "LED Running Boards",
    "Automotive-Style Luxury Leather Seats",
    "3-Point Seat Belts for All Seats",
    "USB Charging Ports",
    "Cupholders for All Passengers",
    "Electric Power Steering (EPS)",
    "On-Demand 4-Wheel Drive (4X4)",
    "Dual 6.3kW AC Motors",
    "48V Lithium Battery with Smart Management",
    "400A AC Controller",
    "25A Onboard Charger",
    "Four-Wheel Hydraulic Disc Brakes",
    "16\" x 8.5\" Aluminum Wheels",
    "24x10R16 All-Season Tires",
  ];

  const lsvEquipment = [
    "LED Headlights",
    "LED Taillights", 
    "LED Brake Lights",
    "Turn Signals",
    "Horn",
    "Side Mirrors",
    "Rearview Mirror",
    "DOT-Approved Street Tires",
    "3-Point Seat Belts",
    "Vehicle Identification Number (VIN)",
  ];

  const optionalUpgrades = [
    "Windshield Wipers & Washer Kit",
    "Rear Bumper Guards",
    "Reflective Trim",
    "License Plate Bracket & Light",
    "Extended Mirrors",
    "LED Light Bars",
    isXT4 ? "" : "160Ah Battery Upgrade",
  ].filter(Boolean);

  const vehicleSchema = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    "@id": `https://allseasonsgolfcarts.com${url}#vehicle`,
    "name": vehicleName,
    "description": vehicleDescription,
    "brand": {
      "@type": "Brand",
      "name": "EVolution Electric Vehicles"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "EVolution Electric Vehicles"
    },
    "model": isXT4 ? "D-MAX XT4" : "D-MAX XT6",
    "vehicleModelDate": "2024",
    "bodyType": "Golf Cart",
    "vehicleConfiguration": `${seating}-Passenger 4X4`,
    "driveWheelConfiguration": "https://schema.org/FourWheelDriveConfiguration",
    "steeringPosition": "https://schema.org/LeftHandDriving",
    "vehicleTransmission": "Electric Direct Drive",
    "fuelType": "Electric",
    "seatingCapacity": seating,
    "numberOfDoors": 0,
    "vehicleInteriorType": "Premium Leather",
    "vehicleEngine": {
      "@type": "EngineSpecification",
      "name": "Dual 6.3kW AC Electric Motors",
      "engineType": "Electric",
      "enginePower": {
        "@type": "QuantitativeValue",
        "value": "12.6",
        "unitCode": "KWT"
      },
      "fuelType": "Electric"
    },
    "speed": {
      "@type": "QuantitativeValue",
      "value": "25",
      "unitCode": "HM",
      "name": "Maximum Speed 25 MPH"
    },
    "payload": {
      "@type": "QuantitativeValue",
      "value": isXT4 ? "2270" : "2500",
      "unitCode": "LBR"
    },
    "weightTotal": {
      "@type": "QuantitativeValue",
      "value": isXT4 ? "1499" : "1700",
      "unitCode": "LBR"
    },
    "wheelbase": {
      "@type": "QuantitativeValue",
      "value": "81",
      "unitCode": "INH"
    },
    "color": colors.map(c => c.name),
    "image": colors.map(c => `https://allseasonsgolfcarts.com/images/${model}-${c.name.toLowerCase().replace(' ', '-')}.png`),
    "url": `https://allseasonsgolfcarts.com${url}`,
    "category": [
      "Electric Golf Cart",
      "4X4 Golf Cart",
      "Street Legal Golf Cart",
      "LSV Golf Cart",
      "Low Speed Vehicle",
      "All-Season Golf Cart",
      `${seating}-Passenger Golf Cart`
    ],
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Drive System",
        "value": "On-Demand 4-Wheel Drive (4X4)"
      },
      {
        "@type": "PropertyValue",
        "name": "Battery Type",
        "value": "48V Lithium with Smart Management"
      },
      {
        "@type": "PropertyValue",
        "name": "Range",
        "value": range
      },
      {
        "@type": "PropertyValue",
        "name": "Charging",
        "value": "25A Onboard Charger"
      },
      {
        "@type": "PropertyValue",
        "name": "Controller",
        "value": "400A AC Controller"
      },
      {
        "@type": "PropertyValue",
        "name": "Brakes",
        "value": "Four-Wheel Hydraulic Disc Brakes"
      },
      {
        "@type": "PropertyValue",
        "name": "Steering",
        "value": "Electric Power Steering (EPS)"
      },
      {
        "@type": "PropertyValue",
        "name": "Wheels",
        "value": "16\" x 8.5\" Aluminum"
      },
      {
        "@type": "PropertyValue",
        "name": "Tires",
        "value": "24x10R16 All-Season"
      },
      {
        "@type": "PropertyValue",
        "name": "LSV Compliant",
        "value": "Yes - Street Legal Ready"
      },
      {
        "@type": "PropertyValue",
        "name": "Infotainment",
        "value": "10.1\" Touchscreen with Apple CarPlay & Android Auto"
      },
      {
        "@type": "PropertyValue",
        "name": "Audio System",
        "value": isXT4 ? "24-Speaker Surround Sound" : "LED Lighted Speakers"
      },
      {
        "@type": "PropertyValue",
        "name": "Wireless Charging",
        "value": "Dual Wireless Phone Charging Pads"
      },
      {
        "@type": "PropertyValue",
        "name": "Refrigeration",
        "value": "Built-In Dash Refrigerator"
      }
    ]
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://allseasonsgolfcarts.com${url}#product`,
    "name": vehicleName,
    "description": vehicleDescription,
    "sku": isXT4 ? "EVOL-DMAX-XT4-2024" : "EVOL-DMAX-XT6-2024",
    "mpn": isXT4 ? "DMAX-XT4" : "DMAX-XT6",
    "brand": {
      "@type": "Brand",
      "name": "EVolution Electric Vehicles"
    },
    "category": "Electric Golf Carts",
    "image": colors.map(c => `https://allseasonsgolfcarts.com/images/${model}-${c.name.toLowerCase().replace(' ', '-')}.png`),
    "url": `https://allseasonsgolfcarts.com${url}`,
    "offers": {
      "@type": "Offer",
      "url": `https://allseasonsgolfcarts.com${url}`,
      "priceCurrency": "USD",
      "price": price,
      "priceValidUntil": "2025-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "AutoDealer",
        "@id": "https://allseasonsgolfcarts.com/#dealer",
        "name": "ALL Seasons Golf Carts",
        "telephone": "+1-844-884-6744",
        "url": "https://allseasonsgolfcarts.com"
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "US"
        }
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "US",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": isXT4 ? "47" : "32",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Golf Cart Enthusiast"
        },
        "reviewBody": `The ${isXT4 ? "XT4" : "XT6"} 4X4 system handles any season with ease. The touchscreen and sound system are amazing!`
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Neighborhood Cruiser"
        },
        "reviewBody": `Perfect street-legal golf cart for our community. The ${seating}-passenger seating is ideal for our family.`
      }
    ],
    "hasVariant": colors.map(color => ({
      "@type": "Product",
      "name": `${vehicleName} - ${color.name}`,
      "color": color.name,
      "sku": `EVOL-DMAX-${model.toUpperCase()}-${color.name.toUpperCase().replace(' ', '')}`,
      "image": `https://allseasonsgolfcarts.com/images/${model}-${color.name.toLowerCase().replace(' ', '-')}.png`,
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": price,
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition"
      }
    }))
  };

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "@id": "https://allseasonsgolfcarts.com/#dealer",
    "name": "ALL Seasons Golf Carts",
    "description": "Premium EVolution D-MAX 4X4 electric golf cart dealer specializing in street-legal LSV vehicles for year-round performance",
    "url": "https://allseasonsgolfcarts.com",
    "telephone": "+1-844-884-6744",
    "priceRange": "$15,000 - $20,000",
    "currenciesAccepted": "USD",
    "paymentAccepted": "Cash, Credit Card, Financing",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "17:00"
      }
    ],
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Vehicle",
          "name": "EVolution D-MAX XT4 4X4 Electric Golf Cart"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Vehicle",
          "name": "EVolution D-MAX XT6 4X4 Electric Golf Cart"
        }
      }
    ],
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-844-884-6744",
      "contactType": "sales",
      "availableLanguage": "English"
    }
  };

  const featuresSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${isXT4 ? "D-MAX XT4" : "D-MAX XT6"} Standard Features`,
    "description": `Complete list of standard features included with the EVolution ${isXT4 ? "D-MAX XT4" : "D-MAX XT6"} 4X4 electric golf cart`,
    "numberOfItems": standardFeatures.length,
    "itemListElement": standardFeatures.map((feature, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": feature
    }))
  };

  const lsvSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Street-Legal LSV Equipment",
    "description": "Equipment included for Low-Speed Vehicle (LSV) street-legal compliance",
    "numberOfItems": lsvEquipment.length,
    "itemListElement": lsvEquipment.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item
    }))
  };

  const upgradesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Optional Upgrades & Add-Ons",
    "description": `Optional upgrades and accessories available for the EVolution ${isXT4 ? "D-MAX XT4" : "D-MAX XT6"}`,
    "numberOfItems": optionalUpgrades.length,
    "itemListElement": optionalUpgrades.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://allseasonsgolfcarts.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": isXT4 ? "D-MAX XT4" : "D-MAX XT6",
        "item": `https://allseasonsgolfcarts.com${url}`
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is the price of the EVolution D-MAX ${isXT4 ? "XT4" : "XT6"}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The EVolution D-MAX ${isXT4 ? "XT4" : "XT6"} starts at $${parseInt(price).toLocaleString()} MSRP.`
        }
      },
      {
        "@type": "Question",
        "name": `Is the D-MAX ${isXT4 ? "XT4" : "XT6"} street legal?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, the D-MAX ${isXT4 ? "XT4" : "XT6"} can be configured to meet Low-Speed Vehicle (LSV) requirements, allowing registration and use on roads with posted speed limits up to 35 mph in many areas.`
        }
      },
      {
        "@type": "Question",
        "name": `How many passengers can the ${isXT4 ? "XT4" : "XT6"} seat?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The D-MAX ${isXT4 ? "XT4" : "XT6"} comfortably seats ${seating} passengers with automotive-style luxury seats and 3-point seat belts for all seats.`
        }
      },
      {
        "@type": "Question",
        "name": `What is the range of the ${isXT4 ? "XT4" : "XT6"} on a single charge?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The D-MAX ${isXT4 ? "XT4" : "XT6"} has a range of ${range} per charge with the 48V lithium battery and smart management system.`
        }
      },
      {
        "@type": "Question",
        "name": "Does it have 4-wheel drive?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, the D-MAX ${isXT4 ? "XT4" : "XT6"} features an on-demand 4-wheel drive (4X4) system with dual independent 6.3kW AC motors for exceptional traction and performance on any terrain.`
        }
      },
      {
        "@type": "Question",
        "name": "What colors are available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The D-MAX ${isXT4 ? "XT4" : "XT6"} is available in 6 colors: White, Black, Blue, Gray, Red, and Sky Blue.`
        }
      },
      {
        "@type": "Question",
        "name": "What entertainment features are included?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The ${isXT4 ? "XT4" : "XT6"} includes a 10.1-inch touchscreen with Apple CarPlay and Android Auto, ${isXT4 ? "a premium 24-speaker surround sound system" : "integrated LED lighted speakers"}, dual wireless phone charging pads, and USB ports.`
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(featuresSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lsvSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(upgradesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
