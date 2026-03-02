document.addEventListener("DOMContentLoaded", () => {
  const $ = (sel) => document.querySelector(sel);

  const state = {};        // single -> string, multi -> Set
  const custom = {};       // sectionId -> string
  let variants = { A: null, B: null, C: null };

  function toast(msg){
    const t = $("#toast");
    if(!t) return;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(window.__toastT);
    window.__toastT = setTimeout(() => t.classList.remove("show"), 1200);
  }

  function single(id,label,options,meta={}){ return {id,label,type:"single",options,...meta}; }
  function multi(id,label,options,meta={}){ return {id,label,type:"multi",options,...meta}; }

  // =========================
  // SECTIONS (Expanded + Stable + Viral Sandals Add-Ons)
  // =========================
  const SECTIONS = [
    single("skinTone","Skin Tone",[
      "Deep Ebony (rich deep tone)","Espresso Noir (very deep)","Cocoa Satin (deep warm brown)","Mocha Rich (deep mocha)",
      "Caramel Bronze (golden caramel)","Honey Bronze (warm honey)","Chestnut Glow (reddish brown)","Golden Tan (sun-kissed)",
      "Warm Beige (light warm)","Ivory (light neutral)"
    ],{default:"Caramel Bronze (golden caramel)"}),

    single("renderStyle","Render Style",[
      "Ultra polished 3D CGI doll render",
      "Bratz-inspired 4K semi-real glam render",
      "Hyper-real glossy editorial doll render",
      "High-fashion campaign lighting render (billboard polish)",
      "Luxury product-shot render (studio tabletop)",
      "Candy-coated plastiglaze render (super reflective)",
      "Kawaii-chibi couture render (gloss + couture fabric detail)",
      "Sticker pack clean cutout look (glossy)"
    ],{default:"Ultra polished 3D CGI doll render"}),

    single("proportions","Body & Proportions",[
      "Oversized 2.5:1 head ratio, tiny waist, thick thighs (signature chibi glam)",
      "Petite thick doll proportions (short + curvy)",
      "Ultra-chibi exaggeration (bigger head, smaller torso, cute hands)",
      "Runway doll proportions (longer legs, still glam face)",
      "Curvy glam doll proportions (hips + thighs emphasized)"
    ],{default:"Oversized 2.5:1 head ratio, tiny waist, thick thighs (signature chibi glam)"}),

    single("skinFinish","Skin Finish",[
      "Hyper smooth candy gloss skin, high shine mapping",
      "Extra wet highlight points (ultra glossy)",
      "Glass-skin glow with glossy highlights",
      "Editorial satin skin (soft + expensive)",
      "Vinyl toy sheen (plastic luxe glow)"
    ],{default:"Hyper smooth candy gloss skin, high shine mapping"}),

    // Face
    single("eyes","Eyes",[
      "Oversized almond sparkle eyes",
      "Bambi eyes (watery highlights)",
      "Fox-eye glam (lifted outer corner)",
      "Cat-eye gaze (sharp liner look)",
      "Half-lidded glam stare",
      "Side-eye baddie eyes",
      "Wide-eyed surprised look"
    ],{default:"Oversized almond sparkle eyes"}),

    multi("lashes","Lashes",[
      "Mega volume lashes","Extra-long top lashes (photo-ready)","Bottom lash detail","Wispy doll lashes",
      "Fluffy mink lashes","Doll cluster lashes (stacked)","Dramatic outer flare",
      "Spiky manga lashes","Wet lash look (separated)"
    ],{default:["Mega volume lashes","Bottom lash detail"]}),

    single("brows","Brows",[
      "Snatched arched brows","Ultra-snatched razor brows","Sharp precision brows","Feathered glam brows","Thin 90s brow (baddie)"
    ],{default:"Snatched arched brows"}),

    single("makeup","Makeup",[
      "Full glam beat, shimmer lids, heavy highlight",
      "Glitter cut-crease + glossy cheeks",
      "Bronzed glam + gold shimmer",
      "Chrome shimmer lids (metallic pop)",
      "Smoky eye + glossy lip combo",
      "Strawberry makeup (pink blush + glossy lips)",
      "Neon liner accent + clean glam",
      "Soft matte beat + blurred under-eye",
      "Halo eye glam (light center pop)",
      "Graphic liner glam (editorial liner shapes)",
      "Rhinestone liner glam (tiny gem accents)"
    ],{default:"Full glam beat, shimmer lids, heavy highlight"}),

    single("lips","Lips",[
      "Gloss bomb pout lips","Overlined nude gloss lips","Hot pink jelly gloss","Brown liner + caramel gloss",
      "Mocha gloss lips","Cherry red glossy lips","Glass clear gloss lips (wet look)",
      "Ombre nude lips (liner fade)","Rose gloss lips","Plum gloss stain"
    ],{default:"Gloss bomb pout lips"}),

    multi("extrasFace","Face Extras",[
      "Freckles","Beauty mark","Glitter tear duct highlight","Tiny rhinestone face gems",
      "Brow piercing","Nose ring (hoop)","Diamond stud nose ring","Lip piercing",
      "Cheek heart beauty stamp","Under-eye glitter dust","Nose bridge rhinestones","Pearl face gems",
      "Septum ring (dainty)","Double nose studs","Diamond tooth gem"
    ],{default:[]}),

    // Nails
    single("nailLength","Nails Length",["Short","Medium","Long","XL","XXL"],{default:"Long"}),
    single("nailShape","Nails Shape",["Square","Coffin","Almond","Stiletto","Round","Ballerina"],{default:"Almond"}),

    single("nailFinish","Nails Finish",[
      "High-gloss gel",
      "Chrome mirror",
      "French tip",
      "Glitter ombré",
      "Jelly gloss",
      "Velvet cat-eye (magnetic)",
      "Pearl glaze",
      "Holographic chrome",
      "Matte velvet finish",
      "Iridescent shimmer"
    ],{default:"High-gloss gel"}),

    single("nailColor","Nails Color",[
      "Nude","Pink","Hot pink","Red","Orange","White","Black","Mocha","Gold chrome","Lime green",
      "Rose pink","Baby pink","Lavender","Sky blue","Mint","Chocolate","Burgundy"
    ],{default:"Pink"}),

    multi("nailArt","Nail Art Details",[
      "Rhinestones","French tip gems","Butterfly accents","Heart accents","Swirl lines","Star decals",
      "Aura nails (soft airbrush)","3D flowers","Designer-inspired pattern","No extra nail art",
      "3D charm(s) (bows/bling/mini icons)","Gold charms (tiny luxe pieces)","Pearl charms","Chain drips on nails",
      "Mix-match set (each nail different)","French tip remix (double tip / V-tip)"
    ],{default:["No extra nail art"]}),

    // Hair
    single("hairStyle","Hair Style",[
      "Waist-length bone straight silk press",
      "Side part body waves (luxury)",
      "Half up half down (sleek + volume)",
      "High snatch ponytail (sleek)",
      "Big golden curls (extra volume, editorial)",
      "Sleek middle-part bob (chin length)",
      "Long layered blowout (bounce)",
      "Water wave bundles (wet look)",
      "Crimped waves (throwback)",
      "Pixie cut glam (sleek)",
      "Side-swept bang + straight hair",

      "Afro (full round volume)",
      "Afro puff (high puff)",
      "Curly afro (defined coils)",
      "TWA (teeny weeny afro)",

      "Dreads (shoulder length)",
      "Dreads (waist length)",
      "Soft dreads (neat + shiny)",
      "Distressed dreads (messy chic)",

      "Locs (waist length)",
      "Butterfly locs (waist length)",
      "Soft locs (lightweight long)",
      "Faux locs (thick + long)",
      "Distressed locs (textured)",

      "Long knotless braids (waist length)",
      "Goddess braids (thick + clean)",
      "Microbraids (long + neat)",
      "Passion twists (long)"
    ],{default:"Waist-length bone straight silk press"}),

    single("hairColor","Hair Color",[
      "Jet black","Chocolate brown","Honey blonde","Golden blonde","Platinum blonde","Copper auburn","Burgundy wine","Rose pink",
      "Two-tone split dye",
      "Black with caramel highlights",
      "Black with blonde money-piece",
      "Brown with honey balayage",
      "Ash blonde",
      "Cherry cola (dark red)",
      "Blue-black (inky shine)",
      "Lilac pastel",
      "Hot pink ombré",
      "Lime green streaks"
    ],{default:"Jet black"}),

    single("cap","Hat / Cap",[
      "No hat","Baseball cap (street luxe)","Trucker hat (baddie)","Beanie (cute street)","Bucket hat (fashion)",
      "Headband (glam)","Silk scarf wrap (luxury)"
    ],{default:"No hat"}),

    single("edges","Edges / Baby Hairs",[
      "Dramatic swirl edges","Laid sleek edges","Soft baby hairs","Extra swoop edges (double swirl)","Gelled edges (super glossy)",
      "No edges (clean hairline)","Baby hair hearts (styled)"
    ],{default:"Dramatic swirl edges"}),

    // Expression + Pose
    single("expression","Expression",[
      "Soft smile","Playful wink","Laughing smile (joyful)","Kissy face","Smirk (confident)","Serious model face",
      "Girl bye side-eye","Eyeroll (viral attitude)","Are you kidding me face","Shocked glam gasp (mouth open)",
      "Baddie stare (intense)","Lip bite (flirty)",
      "Unbothered (blank stare)","Mean mug (don’t play)","Raised brow (unimpressed)","Tongue pop (playful)"
    ],{default:"Soft smile"}),

    single("pose","Pose",[
      "Hand on hip attitude pose","Over-the-shoulder glance","Walking with attitude","Selfie pose holding phone","Peace sign pose",
      "Hands on cheeks shock pose (viral)","Leaning forward (close-up energy)","Hair flip pose","Arms crossed (boss energy)",
      "Crouch pose (street baddie)","Finger snap pose (sassy)","Two-hand hoodie pull (street)","Bag held out (show the purse)",
      "Mirror selfie (phone + flash)","Hand on chin (thinking cute)","One leg pop pose (cute)"
    ],{default:"Hand on hip attitude pose"}),

    // Outfits
    single("setStyle","Style Vibe",[
      "Street luxe","Soft bougie lounge","Pink sparkle glam","Luxury neutral","Black + gold billionaire","Orange statement glam","Neon pop street glam",
      "Y2K baddie","Clean girl luxe","Boss CEO energy","Airport rich auntie"
    ],{default:"Street luxe"}),

    single("outfitSet","Outfit Set",[
      "None (build separate top/bottom)",
      "Velour tracksuit set (luxury lounge)",
      "Hoodie + sweatpants set (street cozy)",
      "Faux fur set (statement)",
      "Denim set (cropped jacket + jeans)",
      "Leather set (noir baddie)",
      "Boss blazer set (CEO energy)",
      "Airport luxe set (travel baddie)",
      "Pink sparkle set (viral)",
      "Street patchwork set (cargo + chains)",
      "Corset + mini skirt set (baddie)",
      "Cardigan + leggings set (cozy luxe)",
      "Matching flare set (y2k glam)",
      "Silk pajama set (rich lounge)",
      "Tennis skirt set (preppy glam)"
    ],{default:"None (build separate top/bottom)"}),

    single("outerwear","Outerwear",[
      "None",
      "Off-shoulder leather jacket (baddie)",
      "Leather moto jacket",
      "Cropped puffer jacket",
      "Faux fur coat (full plush)",
      "Trench coat (luxury)",
      "Varsity jacket",
      "Glossy jacket (patent shine)",
      "Denim jacket (cropped)",
      "Long cardigan (soft luxe)",
      "Bomber jacket (street)",
      "Puffer vest (street luxe)",
      "Sherpa teddy jacket (plush)",
      "Blazer (oversized boss)"
    ],{default:"None"}),

    single("top","Top",[
      "Black bustier top (glam)",
      "Bodysuit (snatched)",
      "Corset top (fashion)",
      "Cropped tank top",
      "Sports bra top",
      "Fitted baby tee",
      "Graphic glam tee",
      "Off-shoulder lounge top",
      "Full hoodie (oversized)",
      "Tube top (sleek)",

      "Ribbed long sleeve crop",
      "Turtleneck bodysuit (sleek)",
      "Sequin top (sparkle)",
      "Mesh top (layered)",
      "Denim corset top",
      "Leather bustier (noir)",
      "Halter top (summer glam)",
      "Satin corset (luxe)",
      "Oversized blazer as top (fashion)",
      "Cardigan (buttoned cute)",
      "Puffer vest + crop top (street)",
      "Sweater (cropped cute)"
    ],{default:"Fitted baby tee"}),

    single("bottom","Bottom",[
      "Patchwork cargo jeans (ripped + camo panels)",
      "Baggy street jeans (oversized)",
      "Ripped jeans",
      "Cargo pants",
      "Wide-leg denim",
      "Stacked sweatpants",
      "Velour joggers",
      "Leather pants",
      "Leggings (glossy athleisure)",
      "Mini skirt",

      "Biker shorts (snatched)",
      "Flare leggings (y2k)",
      "Pleated tennis skirt (preppy)",
      "Maxi skirt (flowy luxe)",
      "Jean mini skirt (street)",
      "Sequin mini skirt (party)",
      "Cargo mini skirt (street baddie)",
      "Wide-leg trousers (boss)",
      "Satin pants (luxe)",
      "Leather mini skirt (noir)",
      "Denim shorts (cute)"
    ],{default:"Ripped jeans"}),

    // Shoes (sneakers + heels + boots)
    single("shoes","Shoes",[
      "Nike Air Max 90","Nike Air Max 95","Nike Air Max 97","Nike Air Max Plus (TN)","Nike Air Force 1","Nike Dunk Low","Nike Dunk High",
      "Jordan 1 High","Jordan 1 Low","Jordan 3","Jordan 4","Jordan 11",
      "Chunky dad sneakers (street)",
      "High-top sneakers (street)",
      "Low-top sneakers (clean)",
      "Platform sneakers (cute chunky)",

      "Clear heels (viral)",
      "Strappy heels (glam)",
      "Platform heels (doll baddie)",
      "Mary Jane platforms (coquette)",
      "Satin bow heels (girly glam)",

      "Knee-high boots (baddie)",
      "Thigh-high boots (glam)",
      "Cowgirl boots (glam cowgirl)",
      "Platform boots (noir)"
    ],{default:"Nike Air Max 97"}),

    // Sandals
    single("sandals","Sandals",[
      "None",
      "Platform slides (designer-inspired)",
      "Fuzzy slides (bougie)",
      "Crocs slides (cute)",
      "Crocs (cute charms style)",
      "Platform Crocs (extra cute)",
      "Slide sandals (clean luxe)",
      "Double-strap slides (chunky)",
      "Quilted slides (bougie look)",
      "Jelly sandals (throwback cute)",
      "Platform sandals (cutesy)",
      "Chunky platform sandals (baddie)",
      "Wedge sandals (summer glam)",
      "Espadrille wedges (vacation)",
      "Strappy flat sandals (cute)",
      "Strappy heel sandals (night out)",
      "Clear strap sandals (viral)",
      "Ankle wrap sandals (goddess)",
      "Gladiator sandals (statement)",
      "Toe-ring sandals (soft glam)",
      "Flip flops (clean)",
      "Platform flip flops (y2k)",
      "Satin bow sandals (girly glam)"
    ],{default:"None"}),

    // ✅ NEW: Sandal Charms / Details (Multi)
    multi("sandalDetails","Sandal Charms / Details",[
      "No extra sandal details",
      "Rhinestone straps",
      "Butterfly charms",
      "Heart charms",
      "Pearl straps",
      "Gold buckle hardware",
      "Chain anklet built-in",
      "Crystal buckle centerpiece",
      "Jelly sparkle texture",
      "Fur trim",
      "Quilted straps",
      "Bow detail (big bow)",
      "Mini bow detail (tiny bow)",
      "Platform studs (metal studs)",
      "Toe ring detail (built-in)",
      "Heel charm dangle (bling)",
      "Charm jibbitz pack (cute icons)",
      "Flower applique",
      "Glitter sole (sparkle outsole)",
      "Transparent straps (clear gel)",
      "Metallic straps (chrome look)"
    ],{default:["No extra sandal details"]}),

    // ✅ NEW: Pedicure style + color
    single("pediStyle","Pedicure Style",[
      "Glossy gel pedicure",
      "French tip pedicure",
      "Chrome pedicure (mirror shine)",
      "Glitter pedicure (sparkle toes)",
      "Jelly pedicure (translucent)",
      "Aura pedicure (airbrush fade)",
      "Pearl glazed pedicure",
      "Minimal clean toes (natural gloss)"
    ],{default:"Glossy gel pedicure"}),

    single("pediColor","Pedicure Color",[
      "White","Nude","Baby pink","Hot pink","Red","Orange","Black","Mocha","Gold chrome","Silver chrome",
      "Lime green","Lavender","Mint","French (white tip)","Glitter clear"
    ],{default:"White"}),

    // ✅ NEW: Foot jewelry separate (so sandals pop)
    multi("footJewelry","Foot Jewelry",[
      "None",
      "Toe rings (gold)",
      "Toe rings (silver)",
      "Toe rings (diamond)",
      "Anklet chain (gold)",
      "Anklet chain (silver)",
      "Butterfly anklet",
      "Heart charm anklet",
      "Diamond anklet (iced)",
      "Foot chain (toe-to-ankle)",
      "Beaded anklet (cute)"
    ],{default:["None"]}),

    single("shoeColorway","Shoe Colorway",[
      "All white (clean)","All black (stealth)","White/Black","White/Pink","White/Orange","Mocha/Cream","Black/Gold",
      "Lime/White (fresh)","Hot Pink/White (barbie pop)","Metallic gold/white",
      "Silver chrome","Rose gold","Pink/Lime split","Cream/Tan luxe","Red/Black"
    ],{default:"White/Black"}),

    // Bags
    single("bag","Pocketbook / Bag",[
      "None",
      "Chanel Classic Flap","Chanel Boy Bag","Chanel Wallet on Chain (WOC)",
      "Louis Vuitton Speedy","Louis Vuitton Neverfull","Louis Vuitton Alma","Louis Vuitton Pochette",
      "Gucci Marmont","Gucci Dionysus",
      "Dior Saddle Bag","Dior Book Tote",
      "Prada Galleria","Prada Nylon Bag",
      "Fendi Baguette",
      "Balenciaga City Bag",
      "Saint Laurent (YSL) Lou Camera Bag","Saint Laurent (YSL) Kate Chain Bag",
      "Goyard Saint Louis Tote",
      "Hermes Birkin","Hermes Kelly","Hermes Constance"
    ],{default:"Chanel Classic Flap"}),

    single("bagColorway","Bag Colorway",[
      "Black","White","Tan","Mocha","Pink","Hot pink","Lime","Orange","Red","Monogram pattern","Quilted leather",
      "Silver metallic","Gold metallic","Pearl white","Blush pink"
    ],{default:"Black"}),

    single("bagHardware","Bag Hardware",[
      "Gold hardware","Silver hardware","Rose gold hardware","Gunmetal hardware"
    ],{default:"Gold hardware"}),

    single("bagCarry","Bag Carry Style",[
      "Handheld","On shoulder","Crossbody","Arm crook carry","Hanging off wrist","Two-hand clutch hold","Bag held out (showing it)"
    ],{default:"On shoulder"}),

    // Jewelry
    multi("jewelry","Jewelry Stack",[
      "Oversized gold hoops","Diamond studs","Multiple ear piercings stack","Ear cuffs","Stacked rings","Bangle stack",
      "Charm bracelet","Watch (iced)","Layered chains","Iced Cuban link chain","Nameplate necklace (uses nameplate box)",
      "Body chain (waist jewelry)","Chain belt (gold)","Heart pendant chain","Anklet chain",
      "Diamond tennis necklace","Tennis bracelet","Pearl necklace (luxe)","Choker chain (tight glam)"
    ],{default:["Oversized gold hoops","Stacked rings","Layered chains"]}),

    // Props
    single("prop","Prop",[
      "None","Phone in hand","Glitter phone case","Sunglasses (oversized)","Coffee cup","Car keys (luxury key fob)",
      "Shopping bags (designer haul)","Lip gloss in hand","Mirror compact","Perfume bottle (luxury)","Cash stack (money theme)",
      "Mini fan (clack fan)","Passport + boarding pass (airport)","Iced drink cup (cute)","Makeup brush (glam)","Camera (creator)"
    ],{default:"None"}),

    // Background
    single("background","Background",[
      "Clean studio gradient backdrop",
      "Hot pink sparkle background",
      "Lime glow studio background",
      "Gold shimmer background",
      "Violet chrome glow background",
      "Black glossy studio background (luxury)",
      "Leopard print (classic tan)",
      "Leopard print (hot pink)",
      "Leopard print (lime)",
      "Leopard print (black + gold)",
      "Luxury closet backdrop (shoe wall)",
      "Glam vanity backdrop (lights + mirrors)",
      "Pink neon studio backdrop",
      "City night lights (bokeh)",
      "Marble wall backdrop (high-end)",
      "Sparkle confetti backdrop (viral)"
    ],{default:"Clean studio gradient backdrop"}),

    single("lighting","Lighting",[
      "Soft beauty ringlight glow",
      "Studio glam lighting with sparkle bokeh",
      "Golden hour luxe glow",
      "High-contrast fashion lighting",
      "Neon rim light + glossy highlights",
      "Product-shot lighting (high specular)",
      "Editorial spotlight + soft fill"
    ],{default:"Soft beauty ringlight glow"}),

    multi("textRules","Text Rules",[
      "No text","No typography","No captions","No watermarks","Allow text sticker (if provided)"
    ],{default:["No text","No typography","No captions","No watermarks"]}),
  ];

  const PRESETS = {
    A: {
      badge:"Street Luxe Leopard",
      picks:{
        skinTone:"Caramel Bronze (golden caramel)",
        renderStyle:"Kawaii-chibi couture render (gloss + couture fabric detail)",
        hairStyle:"Big golden curls (extra volume, editorial)",
        hairColor:"Golden blonde",
        cap:"No hat",
        top:"Black bustier top (glam)",
        bottom:"Patchwork cargo jeans (ripped + camo panels)",
        outerwear:"Off-shoulder leather jacket (baddie)",
        shoes:"Nike Air Max 97",
        sandals:"None",
        shoeColorway:"Metallic gold/white",
        bag:"Chanel Classic Flap",
        bagColorway:"Black",
        bagHardware:"Gold hardware",
        bagCarry:"On shoulder",
        background:"Leopard print (black + gold)",
        lighting:"Editorial spotlight + soft fill"
      }
    },
    B: {
      badge:"Hot Pink Pop",
      picks:{
        setStyle:"Pink sparkle glam",
        hairColor:"Rose pink",
        lips:"Hot pink jelly gloss",
        shoes:"Platform heels (doll baddie)",
        sandals:"None",
        shoeColorway:"Hot Pink/White (barbie pop)",
        background:"Hot pink sparkle background"
      }
    },
    C: {
      badge:"Lime Glow Street",
      picks:{
        background:"Lime glow studio background",
        shoeColorway:"Lime/White (fresh)",
        bagColorway:"Lime",
        setStyle:"Neon pop street glam",
        sandals:"Platform sandals (cutesy)",
        sandalDetails:["Rhinestone straps","Butterfly charms"],
        pediStyle:"French tip pedicure",
        pediColor:"French (white tip)",
        footJewelry:["Anklet chain (gold)","Toe rings (diamond)"]
      }
    }
  };

  function initDefaults(){
    for(const s of SECTIONS){
      if(s.type==="single") state[s.id] = s.default ?? "";
      else state[s.id] = new Set(s.default ?? []);
      custom[s.id] = "";
    }
  }

  function joinMulti(set){
    const arr = [...(set || [])].filter(Boolean);
    return arr.length ? arr.join(", ") : "";
  }

  function estimateCombos(){
    let total = 1;
    for(const s of SECTIONS){
      if(s.type==="single"){
        total *= Math.max(1, s.options.length);
      }else{
        const n = Math.max(1, s.options.length);
        const combos = Math.min(2048, (2 ** Math.min(11, n)) - 1);
        total *= combos;
      }
      if(total > 9999999) break;
    }
    return Math.floor(total);
  }

  function render(){
    const host = $("#sections");
    if(!host) return;

    const q = ($("#search")?.value || "").trim().toLowerCase();
    const filtered = !q ? SECTIONS : SECTIONS.filter(s=>{
      const hay = (s.label+" "+s.id+" "+s.options.join(" ")).toLowerCase();
      return hay.includes(q);
    });

    const sc = $("#sectionCount");
    if(sc) sc.textContent = `${filtered.length} sections`;

    const cc = $("#comboCount");
    if(cc){
      const combos = estimateCombos();
      cc.textContent = combos >= 300 ? "300+ combos" : `${combos} combos`;
    }

    host.innerHTML = "";

    for(const s of filtered){
      const wrap = document.createElement("div");
      wrap.className = "section";

      const head = document.createElement("div");
      head.className = "secHead";

      const left = document.createElement("div");
      left.className = "secLeft";

      const lbl = document.createElement("div");
      lbl.className = "secLabel";
      lbl.textContent = s.label;

      const sub = document.createElement("div");
      sub.className = "secSub";
      sub.textContent = s.type==="single" ? "Single select" : "Multi select";

      left.appendChild(lbl);
      left.appendChild(sub);

      const count = document.createElement("div");
      count.className = "secCount";
      count.textContent = s.type==="single"
        ? (state[s.id] ? "1 selected" : "0 selected")
        : `${state[s.id]?.size || 0} selected`;

      head.appendChild(left);
      head.appendChild(count);

      const body = document.createElement("div");
      body.className = "secBody";

      const chips = document.createElement("div");
      chips.className = "chips";

      for(const opt of s.options){
        const chip = document.createElement("div");
        chip.className = "chip";
        chip.textContent = opt;

        const on = (s.type==="single") ? (state[s.id]===opt) : (state[s.id]?.has(opt));
        if(on) chip.classList.add("on");

        chip.addEventListener("click", ()=>{
          if(s.type==="single"){
            state[s.id] = (state[s.id]===opt) ? "" : opt;
          }else{
            if(!state[s.id]) state[s.id] = new Set();
            if(state[s.id].has(opt)) state[s.id].delete(opt);
            else state[s.id].add(opt);
          }
          render();
          buildPrompts();
        });

        chips.appendChild(chip);
      }

      const customRow = document.createElement("div");
      customRow.className = "customRow";

      const tag = document.createElement("div");
      tag.className = "customTag";
      tag.textContent = "Custom";

      const input = document.createElement("input");
      input.placeholder = `Type a custom detail for "${s.label}"…`;
      input.value = custom[s.id] || "";

      input.addEventListener("input", ()=>{
        custom[s.id] = input.value;
        buildPrompts();
      });

      customRow.appendChild(tag);
      customRow.appendChild(input);

      body.appendChild(chips);
      body.appendChild(customRow);

      wrap.appendChild(head);
      wrap.appendChild(body);
      host.appendChild(wrap);
    }
  }

  function pickRandom(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

  function snapshotFromState(){
    const snap = {};
    for(const s of SECTIONS){
      if(s.type==="single") snap[s.id] = state[s.id] || "";
      else snap[s.id] = new Set([...(state[s.id] || [])]);
    }
    return snap;
  }

  function applySnapshot(snap){
    for(const s of SECTIONS){
      if(s.type==="single") state[s.id] = snap[s.id] || "";
      else state[s.id] = new Set([...(snap[s.id] || [])]);
    }
    render();
    buildPrompts();
  }

  function readFields(){
    return {
      charName: ($("#charName")?.value || "").trim(),
      nameplate: ($("#nameplate")?.value || "").trim(),
      textSticker: ($("#textSticker")?.value || "").trim(),
      customColors: ($("#customColors")?.value || "").trim(),
      customBag: ($("#customBag")?.value || "").trim(),
      customShoeColorway: ($("#customShoeColorway")?.value || "").trim(),
      extraNotes: ($("#extraNotes")?.value || "").trim()
    };
  }

  function customLine(id){
    const v = (custom[id] || "").trim();
    return v ? `Custom: ${v}` : "";
  }

  function buildPromptFrom(snap){
    const f = readFields();
    const lines = [];

    if(f.charName) lines.push(`Character name: ${f.charName}.`);

    lines.push(
      `Ultra glossy glam doll character with ${snap.skinTone || "a rich skin tone"}, ` +
      `${snap.proportions || "oversized chibi glam proportions"}, ` +
      `${snap.skinFinish || "hyper smooth glossy skin"}, dimensional depth, candy gloss finish.`
    );

    if(snap.renderStyle) lines.push(`Render style: ${snap.renderStyle}.`);

    const hairBits = [
      snap.hairStyle, snap.hairColor, snap.cap, snap.edges,
      customLine("hairStyle"), customLine("hairColor"), customLine("cap"), customLine("edges")
    ].filter(Boolean);
    if(hairBits.length) lines.push(`Hair: ${hairBits.join(" | ")}.`);

    const faceBits = [
      snap.eyes, joinMulti(snap.lashes), snap.brows, snap.makeup, snap.lips, joinMulti(snap.extrasFace),
      customLine("eyes"), customLine("lashes"), customLine("brows"), customLine("makeup"), customLine("lips"), customLine("extrasFace")
    ].filter(Boolean);
    if(faceBits.length) lines.push(`Face glam: ${faceBits.join(" | ")}.`);

    const nailBits = [
      snap.nailLength, snap.nailShape, snap.nailFinish, snap.nailColor, joinMulti(snap.nailArt),
      customLine("nailFinish"), customLine("nailArt")
    ].filter(Boolean);
    if(nailBits.length) lines.push(`Nails: ${nailBits.join(" | ")}.`);

    if(snap.expression || customLine("expression")){
      lines.push(`Expression: ${[snap.expression, customLine("expression")].filter(Boolean).join(" | ")}.`);
    }
    if(snap.pose || customLine("pose")){
      lines.push(`Pose/action: ${[snap.pose, customLine("pose")].filter(Boolean).join(" | ")}.`);
    }

    const outfitBits = [];
    if(snap.setStyle) outfitBits.push(`Vibe: ${snap.setStyle}`);
    if(snap.outfitSet && !snap.outfitSet.startsWith("None")) outfitBits.push(`Outfit set: ${snap.outfitSet}`);
    if(snap.top) outfitBits.push(`Top: ${snap.top}`);
    if(snap.bottom) outfitBits.push(`Bottom: ${snap.bottom}`);
    if(snap.outerwear && snap.outerwear!=="None") outfitBits.push(`Outerwear: ${snap.outerwear}`);
    [customLine("setStyle"), customLine("outfitSet"), customLine("outerwear"), customLine("top"), customLine("bottom")]
      .filter(Boolean).forEach(x => outfitBits.push(x));
    if(outfitBits.length) lines.push(`Outfit: ${outfitBits.join(" | ")}.`);

    // Colorway (shared for shoes/sandals)
    const cw = f.customShoeColorway || snap.shoeColorway;

    // Shoes
    if(snap.shoes){
      lines.push(`Shoes: ${snap.shoes}${cw ? ` | colorway: ${cw}` : ""}${customLine("shoes") ? ` | ${customLine("shoes")}` : ""}.`);
    }

    // Sandals
    if(snap.sandals && snap.sandals !== "None"){
      lines.push(`Sandals: ${snap.sandals}${cw ? ` | colorway: ${cw}` : ""}${customLine("sandals") ? ` | ${customLine("sandals")}` : ""}.`);
    }

    // Sandal Details
    const sDet = joinMulti(snap.sandalDetails);
    if(sDet && !sDet.includes("No extra sandal details")){
      lines.push(`Sandal details: ${sDet}${customLine("sandalDetails") ? ` | ${customLine("sandalDetails")}` : ""}.`);
    } else if(customLine("sandalDetails")){
      lines.push(`Sandal details: ${customLine("sandalDetails")}.`);
    }

    // Pedicure (only matters if sandals used, but we allow always)
    if(snap.pediStyle || snap.pediColor || customLine("pediStyle") || customLine("pediColor")){
      const pb = [snap.pediStyle, snap.pediColor, customLine("pediStyle"), customLine("pediColor")].filter(Boolean);
      if(pb.length) lines.push(`Pedicure: ${pb.join(" | ")}.`);
    }

    // Foot jewelry
    const fj = joinMulti(snap.footJewelry);
    if(fj && !fj.includes("None")){
      lines.push(`Foot jewelry: ${fj}${customLine("footJewelry") ? ` | ${customLine("footJewelry")}` : ""}.`);
    } else if(customLine("footJewelry")){
      lines.push(`Foot jewelry: ${customLine("footJewelry")}.`);
    }

    const accBits = [];
    const jew = joinMulti(snap.jewelry);
    if(jew) accBits.push(`Jewelry: ${jew}`);
    if(customLine("jewelry")) accBits.push(customLine("jewelry"));
    if(f.nameplate) accBits.push(`Nameplate necklace text: "${f.nameplate}"`);

    if(snap.bag && snap.bag!=="None"){
      accBits.push(`Pocketbook: ${snap.bag} | colorway: ${snap.bagColorway || "Black"} | hardware: ${snap.bagHardware || "Gold hardware"} | carry: ${snap.bagCarry || "On shoulder"}`);
    }
    if(f.customBag) accBits.push(`Bag notes: ${f.customBag}`);
    [customLine("bag"), customLine("bagCarry"), customLine("bagColorway"), customLine("bagHardware")].filter(Boolean).forEach(x => accBits.push(x));

    if(snap.prop && snap.prop!=="None") accBits.push(`Prop: ${snap.prop}`);
    if(customLine("prop")) accBits.push(customLine("prop"));

    if(accBits.length) lines.push(`Accessories: ${accBits.join(" | ")}.`);

    if(snap.background) lines.push(`Background: ${snap.background}${customLine("background") ? ` | ${customLine("background")}` : ""}.`);
    if(snap.lighting) lines.push(`Lighting: ${snap.lighting}, sparkle bokeh accents, high resolution 4K.`);

    if(f.customColors) lines.push(`Color notes: ${f.customColors}.`);

    const rules = joinMulti(snap.textRules);
    if(rules) lines.push(`Rules: ${rules}.`);

    if(f.textSticker){
      lines.push(`Text sticker template: "${f.textSticker}" (render as glossy 3D bubble sticker typography with sparkles).`);
    }

    if(f.extraNotes) lines.push(`Extra notes: ${f.extraNotes}.`);

    lines.push("Clean subject edges, crisp details, premium polish.");
    return lines.join("\n\n");
  }

  function buildPrompts(){
    const a = $("#outA"), b = $("#outB"), c = $("#outC");
    if(!a || !b || !c) return;

    const snap = snapshotFromState();

    if(variants.A){
      a.value = buildPromptFrom(variants.A);
      b.value = buildPromptFrom(variants.B);
      c.value = buildPromptFrom(variants.C);
    }else{
      const base = buildPromptFrom(snap);
      a.value = base; b.value = base; c.value = base;
    }
  }

  function randomizeOne(){
    const snap = {};
    for(const s of SECTIONS){
      if(s.type==="single"){
        snap[s.id] = pickRandom(s.options);
      }else{
        const k = Math.max(1, Math.min(4, Math.floor(Math.random()*4)+1));
        const set = new Set();
        while(set.size < k) set.add(pickRandom(s.options));
        snap[s.id] = set;
      }
    }
    snap.textRules = new Set(["No text","No typography","No captions","No watermarks"]);
    return snap;
  }

  function randomize3(){
    const A = randomizeOne();
    const B = randomizeOne();
    const C = randomizeOne();
    variants = { A, B, C };

    applySnapshot(A);

    $("#outA").value = buildPromptFrom(A);
    $("#outB").value = buildPromptFrom(B);
    $("#outC").value = buildPromptFrom(C);

    toast("Randomized A/B/C ✅");
  }

  async function copyInstant(txt){
    try{
      await navigator.clipboard.writeText(txt);
      toast("Copied ✅ Paste anywhere");
    }catch(e){
      const ta = document.createElement("textarea");
      ta.value = txt;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      toast("Copied ✅ Paste anywhere");
    }
  }

  function clearAll(){
    for(const s of SECTIONS){
      if(s.type==="single") state[s.id] = "";
      else state[s.id] = new Set();
      custom[s.id] = "";
    }
    variants = {A:null,B:null,C:null};

    ["charName","nameplate","textSticker","customColors","customBag","customShoeColorway","extraNotes"].forEach(id=>{
      const el = $("#"+id);
      if(el) el.value = "";
    });

    if($("#outA")) $("#outA").value = "";
    if($("#outB")) $("#outB").value = "";
    if($("#outC")) $("#outC").value = "";

    render();
    toast("Cleared all ✅");
  }

  function resetDefaults(){
    initDefaults();
    variants = {A:null,B:null,C:null};

    ["charName","nameplate","textSticker","customColors","customBag","customShoeColorway","extraNotes"].forEach(id=>{
      const el = $("#"+id);
      if(el) el.value = "";
    });

    render();
    buildPrompts();
    toast("Reset ✅");
  }

  function loadPreset(key){
    const p = PRESETS[key];
    if(!p) return;
    for(const s of SECTIONS){
      const v = p.picks[s.id];
      if(v === undefined) continue;
      if(s.type==="single") state[s.id] = v;
      else state[s.id] = new Set(Array.isArray(v) ? v : [v]);
    }
    variants = {A:null,B:null,C:null};
    render();
    buildPrompts();
    toast(`Loaded ${p.badge}`);
  }

  const safeOn = (id, evt, fn) => { const el = $("#"+id); if(el) el.addEventListener(evt, fn); };

  safeOn("btnReset", "click", resetDefaults);
  safeOn("btnClear", "click", clearAll);
  safeOn("btnRandom3", "click", randomize3);
  safeOn("btnBuild", "click", buildPrompts);

  safeOn("presetA", "click", ()=>loadPreset("A"));
  safeOn("presetB", "click", ()=>loadPreset("B"));
  safeOn("presetC", "click", ()=>loadPreset("C"));

  safeOn("btnLoadA", "click", ()=>{ if(!variants.A) return toast("Randomize 3 first"); applySnapshot(variants.A); toast("Loaded A"); });
  safeOn("btnLoadB", "click", ()=>{ if(!variants.B) return toast("Randomize 3 first"); applySnapshot(variants.B); toast("Loaded B"); });
  safeOn("btnLoadC", "click", ()=>{ if(!variants.C) return toast("Randomize 3 first"); applySnapshot(variants.C); toast("Loaded C"); });

  safeOn("copyA", "click", ()=>copyInstant($("#outA")?.value || ""));
  safeOn("copyB", "click", ()=>copyInstant($("#outB")?.value || ""));
  safeOn("copyC", "click", ()=>copyInstant($("#outC")?.value || ""));

  safeOn("search", "input", render);

  ["charName","nameplate","textSticker","customColors","customBag","customShoeColorway","extraNotes"].forEach(id=>{
    safeOn(id, "input", buildPrompts);
  });

  // Start
  initDefaults();
  render();
  buildPrompts();
  toast("Loaded ✅");
});