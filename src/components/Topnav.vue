<script lang="ts">
export default {}
</script>

<template>
  <section class="top-section bg-primary text-gray-50 pt-4 pb-9">
    <div class="container mx-auto">
      <nav class="grid-cols-2 hidden md:grid">
        <a>
          <picture>
            <img class="nav-image" src="/images/logo-v2.png" width="100" alt="Logo"/>
          </picture>
        </a>
        <ul class="nav-menu list-none flex justify-end items-center">
          <li data-controller="anchor" data-anchor-target-value="experience-section" class="nav-menu-item ml-10">
            <a data-action="anchor#visit" href="#"
               class="nav-item-link font-comfortaa text-gray-50 decoration-0 text-lg">Expériences</a>
          </li>
          <li data-controller="anchor" data-anchor-target-value="project-section"
              class="nav-menu-item text-gray-50 ml-10">
            <a data-action="anchor#visit" href="#" class="nav-item-link font-comfortaa decoration-0 text-lg">Projets</a>
          </li>
        </ul>
      </nav>

      <div id="blob-header-item" class="max-w-2xl header-intro my-8 mx-auto z-10 relative text-center">
        <svg class="blob-header absolute z-0 top-0 left-0" id="visual" viewBox="0 0 660 260" width="660" height="260"
             xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
          <g>
            <path id="blob1"
                  d="M440.44476636333695,31.402255372006803 C468.2162387620259,56.7718706983766 482.02691692786027,96.70274452568059 478.12389918534177,131.37955600728665 C474.0707653758034,166.0563674888927 452.1538195908922,195.4791166248009 429.9366416719412,215.5946696054728 C407.5693476859701,235.86033865316466 384.90182156595927,246.81881154562024 362.5345275799882,252.37310602535806 C340.01711752699725,257.92740050509576 317.79993960804626,257.92740050509576 285.5249851987592,258.0775165721157 C253.40014685649209,258.0775165721157 211.21753202388896,258.37774870615567 192.9033718474564,238.86265999356345 C174.43909560400374,219.3475712809713 179.9933900837416,180.16727778876705 194.8548807187156,150.74452865285883 C209.86648742070957,121.32177951695067 234.18529027793977,101.80669080435851 258.0537449341102,75.68649514288902 C281.9221995902806,49.71641554843945 305.4904221124111,17.141229005112532 338.0656086557381,6.182756112656938 C370.7909112660849,-4.775716779798673 412.52317789762816,6.032640045636989 440.44476636333695,31.402255372006803 "
                  fill="#353991"/>
          </g>
          <g style="visibility: hidden">
            <path id="blob2"
                  d="M403.7310120762052,54.23482528901723 C425.1578575497208,66.41584018149521 447.6120175322403,83.14639075670593 454.06942301740946,105.01351387693752 C460.5268285025785,126.8806369971691 451.134238705969,153.73757344684947 439.8337791069232,185.29080479483463 C428.5333195078772,216.8440361428198 415.3249901063951,253.24032160468175 393.1643485550195,258.52365336527464 C371.00370700364385,263.8069851258674 339.8907533023748,237.97736318519125 303.9347454872289,225.06255221485318 C267.978737672083,212.29450046008705 227.17967574306033,212.14774124451503 211.62319889242576,193.50932086686802 C196.06672204179125,174.87090048922093 205.89958948511685,137.7408189494989 211.18292124570974,98.40934917619644 C216.6130122218746,59.07787940289401 217.64032673087877,17.838539827155248 238.6268945576782,5.657524934677261 C259.61346238447766,-6.670249173372743 300.4125243135004,10.353819832982037 331.08520036805334,22.534834725460023 C361.75787642260633,34.715849617938005 382.3041666026897,42.053810396539205 403.7310120762052,54.23482528901723 "
                  fill="#353991"/>
          </g>
        </svg>
        <h1 class="font-comfortaa text-4xl mb-16 mt-0 relative z-10">Anthony Matignon</h1>
        <h2 class="text-3xl relative z-10 mb-7 font-medium">Développeur Web (Symfony/VueJS)</h2>
        <p class="text-xl relative z-10 font-medium hidden md:block">Après avoir travaillé dans
          divers domaines du web, je recherche maintenant de
          nouvelles expériences en tant qu'auto-entrepreneur.
          Que vous soyez une agence web, une entreprise ou une boutique, je peux vous aider dans votre développement
          d'application ou sites web.</p>
      </div>
    </div>
  </section>
</template>