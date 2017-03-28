     var formElement=null;
      var respuestaText=null;
      var respuestaText2=null;
      var respuestaSelect=null;
      var respuestaSelect2=null;
      var respuestaSelectMulti=null;
      var respuestaSelectMulti2=null;
      var respuestasCheckbox = [];
      var respuestasCheckbox2 = [];
      var respuestasRadio = [];
      var respuestasRadio2 = [];
      var nota = 0;  //nota de la prueba sobre 10 puntos (hay 10 preguntas)
      var xmlDoc = null;
      var xslDoc = null;

      //**************************************************************************************************** 
      //Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.
        window.onload = function(){ 
      
      //CORREGIR al apretar el botón
      formElement=document.getElementById('myForm');
      formElement.onsubmit=function(){
      
      inicializar();
      if (comprobar()){
      corregirCheckbox();
      corregirText();
      corregirRadio();
      corregirSelect();
      corregirCheckbox2();
      corregirText2();
      corregirRadio2();
      corregirSelect2();
     
      presentarNota();
      alert('seguro quieres enviar');
      }
      return false;
      
      }
       var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
      gestionarXml(this);
      }
      };
      xhttp.open("GET", "https://rawgit.com/oldmoo/autocorrecionXpathXslt/master/xml/questions.xml", true);
      xhttp.send();
        
        //LEER XSL de xml/questions.xml
        var xhttp2 = new XMLHttpRequest();
        xhttp2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        xslDoc=this.responseXML;
        }
        };
        xhttp2.open("GET", "https://rawgit.com/oldmoo/autocorrecionXpathXslt/master/xml/questions.xsl", true);
        xhttp2.send();


     }


           //****************************************************************************************************
      // Recuperamos los datos del fichero XML xml/preguntas.xml
      // xmlDOC es el documento leido XML. 

       function gestionarXml (datosXml) {
          xmlDoc = datosXml.responseXML; //Parse XML to xmlDoc
         //CHECKBOX
      //Recuperamos el título y las opciones, guardamos las respuestas correctas
      var tituloCheckbox = xmlDoc.getElementsByTagName('title')[0].innerHTML;
      var xpath="/questions/question[@id='CJP001']/option";
      var nodesCheckbox = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);

      ponerDatosCheckboxHtml(tituloCheckbox,nodesCheckbox);
      //GUARDAMOS LAS RESPUESTAS CORRECTAS
      var nres = xmlDoc.getElementById("CJP001").getElementsByTagName('answer').length;
      for (i = 0; i < nres; i++) { 
      respuestasCheckbox[i]= xmlDoc.getElementById("CJP001").getElementsByTagName("answer")[i].innerHTML;
      }

       //Recuperamos el título y la respuesta correcta de Input, guardamos el número secreto
      var tituloInput=xmlDoc.getElementsByTagName("title")[1].innerHTML;
      ponerDatosInputHtml(tituloInput);
      respuestaText=xmlDoc.getElementById("CJP002").getElementsByTagName("answer")[0].innerHTML;

      /* SELECT 1*/
      
      var tituloSelect=xmlDoc.getElementsByTagName("title")[2].childNodes[0].nodeValue;
      var xpath="/questions/question[@id='CJP003']/option";
      var nodesSelect = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
      ponerDatosSelectHtml(tituloSelect,nodesSelect);
      //GUARDAMOS LAS RESPUESTAS CORRECTAS
      respuestaSelect= parseInt(xmlDoc.getElementById("CJP003").getElementsByTagName("answer")[0].childNodes[0].nodeValue);

          /* RADIO */
      var tituloRadio = xmlDoc.getElementsByTagName("title")[3].innerHTML;
      var xpath="/questions/question[@id='CJP004']/option";
      var nodesRadio = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
      ponerDatosRadioHtml(tituloRadio,nodesRadio);
      //guardamos las respuetas correctas
      var nres = xmlDoc.getElementById("CJP004").getElementsByTagName('answer').length;
      for (i = 0; i < nres; i++) { 
      respuestasRadio[i]=xmlDoc.getElementById("CJP004").getElementsByTagName("answer")[i].innerHTML;
      }

       /* SELECT MULTIPLE */

      var tituloSelectMultiple=xmlDoc.getElementsByTagName("title")[4].childNodes[0].nodeValue;
      var xpath="/questions/question[@id='CJP005']/option";
      var nodesSelectMultiple = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
      ponerDatosSelecMultipletHtml(tituloSelectMultiple,nodesSelectMultiple);
      //GUARDAMOS LAS RESPUESTAS CORRECTAS 
      respuestaSelectMulti= xmlDoc.getElementsByTagName("answer")[1].childNodes[0].nodeValue;

      /* checkbox 2  */
      
      var tituloCheckbox2 = xmlDoc.getElementsByTagName("title")[7].innerHTML;
      var xpath="/questions/question[@id='CJP008']/option";
      var nodesCheckbox2 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
      ponerDatosCheckbox2Html(tituloCheckbox2,nodesCheckbox2);
      //GUARDAMOS LAS RESPUESTAS
      var nres = xmlDoc.getElementById("CJP008").getElementsByTagName('answer').length;
      for (i = 0; i < nres; i++) { 
      respuestasCheckbox2[i]=xmlDoc.getElementById("CJP008").getElementsByTagName("answer")[i].innerHTML;
      }

        /* input 2 */
      var tituloInput2=xmlDoc.getElementsByTagName("title")[8].innerHTML;
      ponerDatosInputHtml2(tituloInput2);
      respuestaText2= xmlDoc.getElementById("CJP011").getElementsByTagName("answer")[0].innerHTML;

      //RADIO 2
      var tituloRadio2 = xmlDoc.getElementsByTagName("title")[5].innerHTML;
      var xpath="/questions/question[@id='CJP006']/option";
      var nodesRadio = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
      ponerDatosRadioHtml2(tituloRadio2,nodesRadio);
      //guardamos las respuetas correctas
      var nres = xmlDoc.getElementById("CJP006").getElementsByTagName('answer').length;
      for (i = 0; i < nres; i++) { 
      respuestasRadio2[i]=xmlDoc.getElementById("CJP006").getElementsByTagName("answer")[i].innerHTML;
      } 



       /* SELECT 2*/
      
      var tituloSelect2=xmlDoc.getElementsByTagName("title")[6].childNodes[0].nodeValue;
      var xpath="/questions/question[@id='CJP007']/option";
      var nodesSelect = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
      ponerDatosSelectHtml2(tituloSelect2,nodesSelect);
      //GUARDAMOS LAS RESPUESTAS CORRECTAS
      respuestaSelect2= parseInt(xmlDoc.getElementById("CJP007").getElementsByTagName("answer")[0].childNodes[0].nodeValue);

      /* SELECT MULTIPLE 2*/

      var tituloSelectMultiple2=xmlDoc.getElementsByTagName("title")[9].childNodes[0].nodeValue;
      var xpath="/questions/question[@id='CJP010']/option";
      var nodesSelectMultiple = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
      ponerDatosSelecMultipletHtml2(tituloSelectMultiple2,nodesSelectMultiple);
      //GUARDAMOS LAS RESPUESTAS CORRECTAS 
      respuestaSelectMulti2= xmlDoc.getElementsByTagName("answer")[1].childNodes[0].nodeValue;


}

           //****************************************************************************************************************
      /* IMPLEMENTACIÓN CORRECION */
      
           
      function corregirCheckbox(){
      var f=document.getElementById('myForm');
      var escorrecta = [];
      for (i = 0; i < f.rp.length; i++) {
      if (f.rp[i].checked) {
      var useranswer = xmlDoc.createElement("useranswer");   
      useranswer.innerHTML = i+1;
      xmlDoc.getElementById("CJP001").appendChild(useranswer);
      escorrecta[i]=false;     
      for (j = 0; j < respuestasCheckbox.length; j++) {
      if (i==respuestasCheckbox[j]) 
       escorrecta[i]=true;

      }
      } 
      }
      for (i = 0; i < f.rp.length; i++) {   
      if (f.rp[i].checked) {
      if (escorrecta[i]) {
      nota +=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas correctas   
      //darRespuestaHtml("P1:  CORRECTA");    
      } else {
      nota -=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas correctas   
      //darRespuestaHtml("P1:  INCORRECTA (LA RESPUESTA CORRECTA ES FRAMEWORK DE JAVASCRIPT PARA APLICACIONES SPA)");
      }   
      }
      }
      }

       function corregirCheckbox2(){
      var f=document.getElementById('myForm');
      var escorrecta = [];
      for (i = 0; i < f.salary.length; i++) {
      if (f.salary[i].checked) {
      var useranswer = xmlDoc.createElement("useranswer");   
      useranswer.innerHTML = i+1;
      xmlDoc.getElementById("CJP008").appendChild(useranswer);
      escorrecta[i]=false;     
      for (j = 0; j < respuestasCheckbox2.length; j++) {
      if (i==respuestasCheckbox2[j]) 
       escorrecta[i]=true;

      }
      } 
      }
      for (i = 0; i < f.salary.length; i++) {   
      if (f.salary[i].checked) {
      if (escorrecta[i]) {
      nota +=1.0/respuestasCheckbox2.length;  //dividido por el número de respuestas correctas   
      //darRespuestaHtml("P6:  CORRECTA");    
      } else {
      nota -=1.0/respuestasCheckbox2.length;  //dividido por el número de respuestas correctas   
      //darRespuestaHtml("P6:  INCORRECTA (LA RESPUESTA CORRECTA ES 1500€)");
      }   
      }
      }
      }
       
     function corregirText(in1,in2){
       var s=document.getElementById("texto").value;
        in1=s.toUpperCase();
        in2=respuestaText.toUpperCase();
       
       if(in1==in2){
       
            nota +=1;
            var useranswer = xmlDoc.createElement("useranswer");   
            useranswer.innerHTML = s;
            xmlDoc.getElementById("CJP002").appendChild(useranswer);

       }
 }


      function corregirText2(){
       var s=document.getElementById("texto2").value;
       var mayus=s.toUpperCase();
       var mayus2=respuestaText2.toUpperCase();
       
       if(mayus==mayus2){
       
        nota +=1;
        var useranswer = xmlDoc.createElement("useranswer");   
        useranswer.innerHTML = s;
        xmlDoc.getElementById("CJP011").appendChild(useranswer);

       
       
       
       }
       
       }
       

        function corregirSelect2(){
      //Compara el índice seleccionado con el valor del íncide que hay en el xml (<answer>2</answer>)
      //para implementarlo con type radio, usar value para enumerar las opciones <input type='radio' value='1'>...
      //luego comparar ese value con el value guardado en answer
     //formElement.elements[2];  
      var sele = document.getElementById("sel2");

      if (sele.selectedIndex-1==respuestaSelect2) { //-1 porque hemos puesto una opción por defecto en el select que ocupa la posición 0
      //darRespuestaHtml("P9: CORRECTA");
      nota +=1;
      }

       var useranswer = xmlDoc.createElement("useranswer");   
      useranswer.innerHTML = sele.selectedIndex;
      xmlDoc.getElementById("CJP007").appendChild(useranswer);
        
      }
      

        function corregirSelect(){
      //Compara el índice seleccionado con el valor del íncide que hay en el xml (<answer>2</answer>)
      //para implementarlo con type radio, usar value para enumerar las opciones <input type='radio' value='1'>...
      //luego comparar ese value con el value guardado en answer
     //formElement.elements[2];  
      var sele = document.getElementById("sel");

      if (sele.selectedIndex-1==respuestaSelect) { //-1 porque hemos puesto una opción por defecto en el select que ocupa la posición 0
      //darRespuestaHtml("P4: CORRECTA");
      nota +=1;
      }
       var useranswer = xmlDoc.createElement("useranswer");   
      useranswer.innerHTML = sele.selectedIndex;
      xmlDoc.getElementById("CJP003").appendChild(useranswer);
      }

      function corregirRadio(){
      //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
      var f=formElement;
      var escorrecta = [];
      for (i = 0; i < f.year.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.year[i].checked) {
      var useranswer = xmlDoc.createElement("useranswer");   
      useranswer.innerHTML = i+1;
      xmlDoc.getElementById("CJP004").appendChild(useranswer);
      escorrecta[i]=false;     
      for (j = 0; j < respuestasRadio.length; j++) {
      if (i==respuestasRadio[j]) escorrecta[i]=true;
      }
      //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
      if (escorrecta[i]) {
      nota +=1.0/respuestasRadio.length;  //dividido por el número de respuestas correctas   
      //darRespuestaHtml("P3: CORRECTA");    
      } else {
      nota -=1.0/respuestasRadio.length;  //dividido por el número de respuestas correctas   
      //darRespuestaHtml("P3: INCORRECTA, LA RESPUESTA CORRECTA ES (1995)");
      }   
      } 
      }
      }

         function corregirRadio2(){
      //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
      var f=formElement;
      var escorrecta = [];
      for (i = 0; i < f.soft.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.soft[i].checked) {
      var useranswer = xmlDoc.createElement("useranswer");   
      useranswer.innerHTML = i+1;
      xmlDoc.getElementById("CJP006").appendChild(useranswer);
      escorrecta[i]=false;     
      for (j = 0; j < respuestasRadio2.length; j++) {
      if (i==respuestasRadio2[j]) escorrecta[i]=true;
      }
      //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
      if (escorrecta[i]) {
      nota +=1.0/respuestasRadio2.length;  //dividido por el número de respuestas correctas   
      //darRespuestaHtml("P8: CORRECTA");    
      } else {
      nota -=1.0/respuestasRadio2.length;  //dividido por el número de respuestas correctas   
      //darRespuestaHtml("P8: INCORRECTA, LA RESPUESTA CORRECTA ES (APPLE)");
      }   
      } 
      }
      }


          



//*************************************************************************************************************
      // PONER LOS DATOS EN EL HTML 

      function ponerDatosCheckboxHtml(t,nodes){
      var checkboxContainer=document.getElementById('checkboxDiv');
      document.getElementById('tituloCheckbox').innerHTML = t;
      var result = nodes.iterateNext();
      i = 0;
      while (result) {
             
      var input = document.createElement("input");
      var label = document.createElement("label");
      label.innerHTML = result.innerHTML;
      label.setAttribute("for", "rp_"+i);
      input.type="checkbox";
      input.name="rp";
      input.id="rp"+i;    
      checkboxContainer.appendChild(input);
      checkboxContainer.appendChild(label);
      checkboxContainer.appendChild(document.createElement('br'));
      result = nodes.iterateNext();
      }  
      }

        function ponerDatosInputHtml(t){
      document.getElementById("tituloInput").innerHTML = t;
      }

      function ponerDatosSelectHtml(t,nodes){
      document.getElementById("tituloSelect").innerHTML=t;
      var select = document.getElementsByTagName("select")[0];
      var result = nodes.iterateNext();
      i = 0;
      while (result) {
                  
      var option = document.createElement("option");
      option.text = result.innerHTML;
      option.value=i+1; i++;
      select.options.add(option);
      result = nodes.iterateNext();
      }  
      }

        function ponerDatosRadioHtml(t,nodes) {
      var radioContainer=document.getElementById('radioDiv');
      document.getElementById('tituloRadio').innerHTML = t;
      var result = nodes.iterateNext(); 
      var i = 0;
      while (result) {
                  
      var input = document.createElement("input");
      var label = document.createElement("label");
      label.innerHTML= result.innerHTML;
      label.setAttribute("for", "year"+i);
      input.type="radio";
      input.name="year";
      input.id="year"+i;;    
      radioContainer.appendChild(input);
      radioContainer.appendChild(label);
      radioContainer.appendChild(document.createElement('br'));
      result = nodes.iterateNext();
      }
      }

      function ponerDatosSelecMultipletHtml(t,nodes){
      document.getElementById("tituloSelectMultiple").innerHTML=t;
      var selectMultiple = document.getElementById("selMultiple");
      var result = nodes.iterateNext();
      i = 0;
      while(result)  {
           
      
      var option2 = document.createElement("option");
      option2.text = result.innerHTML;
      option2.value=i+1; i++;
      selectMultiple.options.add(option2);
      result = nodes.iterateNext();
      }  
      }

      function ponerDatosCheckbox2Html(t,nodes){
      var checkboxContainer=document.getElementById('checkboxDiv2');
      document.getElementById('tituloCheckbox2').innerHTML = t;
      var result = nodes.iterateNext();
      i = 0;
      while (result) {
             
      var input = document.createElement("input");
      var label = document.createElement("label");
      label.innerHTML = result.innerHTML;
      label.setAttribute("for", "salary"+i);
      input.type="checkbox";
      input.name="salary";
      input.id="salary"+i;    
      checkboxContainer.appendChild(input);
      checkboxContainer.appendChild(label);
      checkboxContainer.appendChild(document.createElement('br'));
      result = nodes.iterateNext();
      }  
      }

        function ponerDatosInputHtml2(t){
      document.getElementById("tituloInput2").innerHTML = t;
      }


      function ponerDatosRadioHtml2(t,nodes) {
      var radioContainer=document.getElementById('radioDiv2');
      document.getElementById('tituloRadio2').innerHTML = t;
      var result = nodes.iterateNext(); 
      var i = 0;
      while (result) {
                  
      var input = document.createElement("input");
      var label = document.createElement("label");
      label.innerHTML= result.innerHTML;
      label.setAttribute("for", "soft"+i);
      input.type="radio";
      input.name="soft";
      input.id="soft"+i;;    
      radioContainer.appendChild(input);
      radioContainer.appendChild(label);
      radioContainer.appendChild(document.createElement('br'));
      result = nodes.iterateNext();
      }
      }


      function ponerDatosSelectHtml2(t,nodes){
      document.getElementById("tituloSelect2").innerHTML=t;
      var select = document.getElementById('sel2');
      var result = nodes.iterateNext();
      i = 0;
      while (result) {
                  
      var option = document.createElement("option");
      option.text = result.innerHTML;
      option.value=i+1; i++;
      select.options.add(option);
      result = nodes.iterateNext();
      }  
      }

      function ponerDatosSelecMultipletHtml2(t,nodes){
      document.getElementById("tituloSelectMultiple2").innerHTML=t;
      var selectMultiple = document.getElementById("selMultiple2");
      var result = nodes.iterateNext();
      i = 0;
      while(result)  {
           
      
      var option2 = document.createElement("option");
      option2.text = result.innerHTML;
      option2.value=i+1; i++;
      selectMultiple.options.add(option2);
      result = nodes.iterateNext();
      }  
      }

        //***************************************************************************************************************
      //Gestionar la presentación de las respuestas
      function darRespuestaHtml(r){
      var p = document.createElement("p");
      var node = document.createTextNode(r);
       p.style.color = '#269900';
      p.appendChild(node);
      document.getElementById('resultadosDiv').appendChild(p);
      }
      
        function presentarNota(){
        document.getElementById('resultadosDiv').style.display = "block";
        //Código transformación xslt con xmlDoc y xslDoc
        if (document.implementation && document.implementation.createDocument) {
        xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xslDoc);
        resultDocument = xsltProcessor.transformToFragment(xmlDoc, document);
        document.getElementById('resultadosDiv').appendChild(resultDocument);
        }
        darRespuestaHtml("Nota: "+nota+" puntos sobre 10");
        //bloquear formulario (recargar para volver a empezar)
        var f=formElement;
        var e = f.elements;
        for (var i = 0, len = e.length; i < len; ++i) {
        e[i].disabled = true;
        }
        }
        
      
      
      
      function inicializar(){
      document.getElementById('resultadosDiv').innerHTML = "";
      nota=0.0;
      }

      
      //****************************************************************************************************************
      /* Comprobar que se han introducido datos en el formulario */
      function comprobar(){
      var f=formElement;
      var checked=false;
      for (i = 0; i < f.rp.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.rp[i].checked) checked=true;
      }
      if (f.elements[0].value=="") {
      f.elements[0].focus();
      alert("Escribe un número");
      return false;
      } else if (f.elements[1].selectedIndex==0) {
      f.elements[1].focus();
      alert("Selecciona una opción");
      return false;
      } if (!checked) {    
      document.getElementsByTagName("h3")[2].focus();
      alert("Selecciona una opción del checkbox");
      return false;
      } else  return true;
      }
