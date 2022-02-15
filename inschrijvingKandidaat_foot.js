<script>
        var hostservernaam = "https://higpow2.digiportaal.be:6002";
        var Ko_Registertype_Id = 1;

        function CheckedChangeKeuze() {
            if (this.checked) {
                $(this).siblings(":last").show();
                var keuze = $(this).siblings(":last");
                var getalKeuze = keuze[0].innerText.split(' ')[0];
                var som = parseInt($("#aantal_uw_gekozenwoningen").text()) + parseInt(getalKeuze);
                $("#aantal_uw_gekozenwoningen").text(som);
            }
            else {
                $(this).siblings(":last").hide();
                var keuze = $(this).siblings(":last");
                var getalKeuze = keuze[0].innerText.split(' ')[0];
                var som = parseInt($("#aantal_uw_gekozenwoningen").text()) - parseInt(getalKeuze);
                $("#aantal_uw_gekozenwoningen").text(som);
            }
        }

        function ActieOntvoogdOfBegeleiding() {
            $("#MsgBox").css("display", "inline-block");
            $("#MsgBox0").css("display", "none");
            $("#MsgBox2").css("display", "none");
            $(".c-validation-message").css("display", "none");
            $(".typo-style-8").css("color", "lightblue");
            var opm = $('input[name=leeftijd_a]:checked').val();
        }

        function ActieJa() {
            var msg = $("#MsgBox");
            $("#MsgBox").css("display", "none");
            $("#MsgBox0").css("display", "none");
            $("#MsgBox2").css("display", "none");
            $(".c-validation-message").css("display", "none");
        }

        function ActieNeen() {
            $("#MsgBox0").css("display", "inline-block");
            $(".typo-style-8").css("color", "red");
            $("#MsgBox").css("display", "none");
            $("#MsgBox2").css("display", "none");
            $(".c-validation-message").css("display", "none");
            $("#btnConfirm0").prop("disabled", true);
        }

        function ActieJa2() {
            $("#MsgBox2").css("display", "inline-block");
            $("#MsgBox0").css("display", "none");
            $("#MsgBox").css("display", "none");
            $(".typo-style-8").css("color", "red");
            $(".c-validation-message").css("display", "none");
            $("#btnConfirm0").prop("disabled", true);
        }

        function ActieNeen2() {
            $("#MsgBox2").css("display", "none");
            $("#MsgBox0").css("display", "none");
            $("#MsgBox").css("display", "none");
            $(".c-validation-message").css("display", "none");
            $("#btnConfirm0").prop("disabled", false);
        }

        function GeenExtraInwoners() {
            $("#extraInwoners").css("display", "none");
            $(".c-validation-message").css("display", "none");
            var aantal = $('#aantal').text();
            var counter = parseInt(aantal) - 1;
            $('#aantal').text(counter);
        }

        function ExtraInwoners() {
            $("#extraInwoners").css("display", "inline-block");
            var aantal = $('#aantal').text();
            var counter = parseInt(aantal) + 1;
            $('#aantal').text(counter);
        }

        function DeleteInwoner() {
            var aantal = $('#aantal').text();
            var counter = parseInt(aantal);
            if (counter <= 0) {
                $('#extra-n').prop("checked", true);
            }
            var cp = $("#inw" + counter).html();
            $("#inw" + counter).css("display", "none");
        }

        function AddInwoner() {
            var aantal = $('#aantal').text();
            var counter = parseInt(aantal) + 1;
            $('#aantal').text(counter);
            var cp = $("#extraInwoners").html();
            $("#inw" + counter).css("display", "inline-block");
        }

        function VolgendeStap1() {
            var leeftijdchk = $('input[name=leeftijd_a]:checked').val();
            var eigendomchk = $('input[name=eigendom_a]:checked').val();
            if (leeftijdchk !== undefined && leeftijdchk !== "" && eigendomchk !== undefined && eigendomchk !== "") {
                $("#stap0").css("display", "none");
                $("#stap1").css("display", "inline-block");
            }
            else {
                $(".c-validation-message").css("display", "inline-block");
            }
        }

        function VorigeStap0() {
            $("#stap1").css("display", "none");
            $("#stap0").css("display", "inline-block");
        }


        function VorigeStap1() {
            $("#stap2_1").css("display", "none");
            $("#stap1").css("display", "inline-block");
        }

        function VorigeStap2_1() {
            $("#stap2").css("display", "none");
            $("#stap2_1").css("display", "inline-block");
        }

        function VolgendeStap2_1() {
            $("#stap1").css("display", "none");
            var aantalInwoners = $('#aantal').text();

            jQuery.ajax({
                type: "GET",
                url: hostservernaam + "/API/DMZ/Komplex/GetKeuzeGemeentes",
                success: function (data) {
                    if (data !== null) {
						var ulGemeenteId = document.getElementById("ul_Gemeentes1");
                        if (!ulGemeenteId) 
						{
							var ulGemeente = document.createElement("ul");
							ulGemeente.id = "ul_Gemeentes1";

							for (var i = 0; i < data.length; i++) {
								var liGemeente = document.createElement("li");
								liGemeente.id = "li_Gemeente1_" + data[i].Omschrijving;

								var chkboxGemeente = document.createElement("input");
								chkboxGemeente.type = "checkbox";
								chkboxGemeente.id = "gemeenteBox_" + data[i].Gemeente_ID + "_" + data[i].Code + "_" + data[i].Omschrijving;
								chkboxGemeente.className = "GemeenteClass";
								chkboxGemeente.value = data[i].Gemeente_ID;

								var lblGemeente = document.createElement("label");
								lblGemeente.setAttribute("for", "gemeenteBox_" + data[i].Gemeente_ID + "_" + data[i].Code + "_" + data[i].Omschrijving);
								lblGemeente.innerText = data[i].Code + " " + data[i].Omschrijving;

								liGemeente.appendChild(chkboxGemeente);
								liGemeente.appendChild(lblGemeente);

								ulGemeente.appendChild(liGemeente);
							}
							var gemeenteKeuze = document.getElementById("gemeenteKeuze");
							gemeenteKeuze.appendChild(ulGemeente);
						}
                    }
                }
            });

            var somAantalVerhuurbarePanden = 0;
            jQuery.ajax({
                type: "GET",
                url: hostservernaam + "/API/DMZ/Komplex/GetKandidaatKomplexKeuzes/" + aantalInwoners + "/" + Ko_Registertype_Id + "/" + "",
                success: function (data) {
                    if (data !== null) {
                        for (var i = 0; i < data.length; i++) {
                            somAantalVerhuurbarePanden = somAantalVerhuurbarePanden + data[i].AantalVerhuurbarePanden;
                        }
                    }
                    $("#aantal_uw_toepasbarewoningen").text(somAantalVerhuurbarePanden);
                }
            });


            $("#stap2_1").css("display", "inline-block");
        }

        function VolgendeStap2() {
            $("#stap2_1").css("display", "none");
            var aantalInwoners = $('#aantal').text();
            var gekozenGemeentesChkBoxes = $('.GemeenteClass:checkbox:checked')
            var arrGekozenGemeentes = $(".GemeenteClass:checkbox:checked")
                .map(function () {
                    return this.value;
                })
                .get()
                .join(",");

            jQuery.ajax({
                type: "GET",
                url: hostservernaam + "/API/DMZ/Komplex/GetKandidaatKomplexKeuzes/" + aantalInwoners + "/" + Ko_Registertype_Id + "/" + arrGekozenGemeentes,
                success: function (data) {
                    var objWoningType = 0;
                    var objSlpks = 0;
                    var objGemeente = "";
                    var objKomplex = "";

                    if (data !== null) {
					    var ulGemeenteId = document.getElementById("ul_Gemeentes");
                        if (!ulGemeenteId)
                        {
							var ulGemeente = document.createElement("ul");
							ulGemeente.id = "ul_Gemeentes";
							var komplexkeuzes = document.getElementById("komplexkeuzes");
							for (var i = 0; i < data.length; i++) {
								objWoningType = data[i].Type;
								objSlpks = data[i].Slaapkamers;
								objKomplex = {
									Komplex: data[i].Omschrijving
								}

								var chkbox = document.createElement("input");
								chkbox.type = "checkbox";
								chkbox.id = data[i].Komplex_ID + "-" + data[i].Slaapkamers + "-" + data[i].Type_ID + "-" + data[i].Type.replace('.', '').trim();
								chkbox.className = "WoningTypeClass";
								chkbox.name = "Komplex";
								chkbox.addEventListener("change", CheckedChangeKeuze)

								var lbl = document.createElement("label");
								lbl.id = "lbl_" + data[i].Komplex_ID;
								lbl.setAttribute("for", "typeBox_" + data[i].Komplex_ID + "_" + data[i].Type + "_" + data[i].Slaapkamers);
								lbl.innerText = objWoningType + ' ' + objSlpks + ' slaapkamer(s) ' + objKomplex.Komplex;

								var lblVerhuurbarePanden = document.createElement("label");
								lblVerhuurbarePanden.id = "lbl_VHPand_" + data[i].Code + "_" + data[i].Omschrijving;
								lblVerhuurbarePanden.setAttribute("for", "verhuurbaarpandBox_" + data[i].Gemeente_ID + "_" + data[i].Code + "_" + data[i].Omschrijving);
								lblVerhuurbarePanden.innerText = data[i].AantalVerhuurbarePanden + " panden";
								lblVerhuurbarePanden.style.display = 'none';

								var brNextLine = document.createElement("br");

								var liGemeente = document.createElement("li");
								liGemeente.id = "li_Gemeente_" + objKomplex.Komplex;

								liGemeente.appendChild(chkbox);
								liGemeente.appendChild(lbl);
								liGemeente.appendChild(brNextLine);
								liGemeente.appendChild(lblVerhuurbarePanden);

								ulGemeente.appendChild(liGemeente);
							}
							komplexkeuzes.appendChild(ulGemeente);
						}
                    }
                }
            });

            $("#stap2").css("display", "inline-block");
        }

        function VolgendeStap3() {
            var keuzePercentage = parseInt($("#aantal_uw_gekozenwoningen").text()) / parseInt($("#aantal_uw_toepasbarewoningen").text()) * 100;
            var blnGaVerder = true;
            var strTextKeuzes = "";
            if (keuzePercentage >= 30) {
                strTextKeuzes = "U heeft 30% of meer van de panden van de keuze-komplexen geselecteerd. Deze keuzes volstaan.";
            }
            else if (keuzePercentage < 30) {
                strTextKeuzes = "U heeft minder dan 30% van de panden van de keuze-komplexen geselecteerd. Dit is te weinig, selecteer aub meer.";
                blnGaVerder = false;
            }

            alert(strTextKeuzes);
            alert("U heeft " + $("#aantal_uw_gekozenwoningen").text() + " woningen aangevinkt.");

            if (blnGaVerder) {
                $("#stap2").css("display", "none");

                jQuery.ajax({
                    type: "GET",
                    url: hostservernaam + "/API/DMZ/Inwoner/GetWoningKeuzes",
                    success: function (data) {
                        if (data !== null) {
                            for (var i = 0; i < data.length; i++) {
							    var woningkeuzeId = document.getElementById("keuzeBox_" + data[i].ID);
                                if (!woningkeuzeId)
                                {
									var chkbox = document.createElement("input");
									chkbox.type = "checkbox";
									chkbox.id = "keuzeBox_" + data[i].ID;

									var lbl = document.createElement("label");
									lbl.setAttribute("for", "keuzeBox_" + data[i].ID);
									lbl.innerText = data[i].Omschrijving;

									var brel = document.createElement("br");

									var woningkeuzes = document.getElementById("woningkeuzes");
									woningkeuzes.appendChild(chkbox);
									woningkeuzes.appendChild(lbl);
									woningkeuzes.appendChild(brel);
								}
                            }
                        }
                    }
                });

                $("#stap3").css("display", "inline-block");
            }
        }

        function VorigeStap2() {
            $("#stap3").css("display", "none");
            $("#stap2").css("display", "inline-block");
        }

        function VorigeStap3() {
            $("#finalStep").css("display", "none");
            $("#stap3").css("display", "inline-block");
        }

        function FinalStap() {
            $("#stap3").css("display", "none");

            jQuery.ajax({
                type: "GET",
                url: hostservernaam + "/API/DMZ/Inwoner/GetKandidaatAttesten/" + Ko_Registertype_Id,
                success: function (data) {
                    if (data !== null) {
                        var attestidx = 1;
                        for (var i = 0; i < data.length; i++) {
							var attestDocId = document.getElementById("pdfbestand_" + data[i].ID + "_" + data[i].Omschrijving + "_" + attestidx);
                            if (!attestDocId)
                            {
								var attestNaam = document.createElement("p");
								attestNaam.innerText = data[i].Omschrijving;

								var attstDocHidden = document.createElement("input");
								attstDocHidden.type = "hidden";
								attstDocHidden.id = "AttestDoc" + attestidx;
								attstDocHidden.value = "";

								var attstOmsch = document.createElement("input");
								attstOmsch.id = "pdfbestand_" + data[i].ID + "_" + data[i].Omschrijving + "_" + attestidx;
								attstOmsch.type = "file";
								attstOmsch.name = "other-files";
								attstOmsch.className = "jcf-real-element";
								attstOmsch.addEventListener("change", function (event) {
									var upload = this;
									var fileReader = new FileReader();
									var attestidxSelected = upload.id.split('_')[3];
									if (fileReader !== null) {
										var ev = event.target.files;
										var fileName = ev[0].name;
										var fileBytesStr;
										var fileList = ev;
										fileReader.onloadend = function () {
											fileBytesStr = fileReader.result;
											fileBytesStr = fileReader.result.split(',')[1];

											$("#AttestDoc" + attestidxSelected).val(fileBytesStr);
										}
										fileReader.readAsDataURL(fileList[0]);
									}
								}, false);

								var attestdocs = document.getElementById("attestdocs");
								attestdocs.appendChild(attestNaam);
								attestdocs.appendChild(attstOmsch);
								attestdocs.appendChild(attstDocHidden);
							}
                            attestidx = attestidx + 1;
                        }
                    }
                }
            });

            $("#finalStep").css("display", "inline-block");
        }

        function VerstuurAanvraag() {
            var aanvragerNaam = $("#Aanvrager_Naam").val();
            var aanvragerINSZ = $("#Aanvrager_INSZ").val();
            var aanvragerStraat = $("#Aanvrager_Straat").val();
            var aanvragerHuisnr = $("#Aanvrager_Huisnr").val();
            var aanvragerBusnr = $("#Aanvrager_Busnr").val();
            var aanvragerGemeente = $("#gemeenteCode").val() + ' ' + $("#gemeente").val();
            var aanvragerEmail = $("#emailadres").val();
            var aanvragerGsmnr = $("#telgsmnr").val();
            var aanvragerTelnr = "";
            if (aanvragerGsmnr.indexOf("09") === 0 || aanvragerGsmnr.indexOf("09") === 1) {
                aanvragerTelnr = aanvragerGsmnr;
            }

            var inwonersArr = new Array();
            var aantal = $('#aantal').text();
            var counter = parseInt(aantal);
            var indexCnt = 0;
            var blnAdd = false;
            for (var c = 0; c < counter; c++) {
                var obj = {
                    Naam: "",
                    INSZ: ""
                };
                $("input[name*='extra-person-" + c + "']").each(function (index, data) {
                    var ct = indexCnt + 1;
                    if ($("#inw" + ct).css("display") == "block" || $("#inw" + ct).css("display") == "inline-block" )
                    {
                        if (isNaN($(this).val())) {
                            obj.Naam = $(this).val();
                        }
                        else {
                            obj.INSZ = $(this).val();
                            blnAdd = true;
                        }
                    }

                    if (blnAdd == true) {
                        inwonersArr[indexCnt] = obj;
                        indexCnt = indexCnt + 1;
                        blnAdd = false;
                    }
                });
            }

            var aanvragerOpmerking = $('input[name=leeftijd_a]:checked').val();
            if (!isNaN(aanvragerOpmerking)) {
                aanvragerOpmerking = "";
            }
            var model =
            {
                Naam: aanvragerNaam,
                Straat: aanvragerStraat,
                HuisNr: aanvragerHuisnr,
                BusNr: aanvragerBusnr,
                Gemeente: aanvragerGemeente,
                EmailAdres: aanvragerEmail,
                TelefoonNr: aanvragerTelnr,
                GSMNr: aanvragerGsmnr,
                INSZ: aanvragerINSZ,
                Inwoners: inwonersArr,
                Opmerking: aanvragerOpmerking
            };

            var json = JSON.stringify(model);
            var contactRelatieId = 0;
            jQuery.ajax({
                type: "POST",
                url: hostservernaam + "/API/DMZ/Inwoner/AanmakenKandidaat",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data !== null) {
                        jQuery.ajax({
                            type: "GET",
                            url: hostservernaam + "/API/DMZ/Inwoner/GetContactRelatie/" + model.Naam,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (data) {
                                contactRelatieId = data;

                                var attestenArr = new Array();
                                attestenArr.length = 0;
                                var idx = 0;
                                $("input[name='other-files']").each(function (index, data) {
                                    if (data.files.length !== 0) {
                                        var fileName = data.files[0].name;
                                        var attestIdSelected = index + 1;
                                        var fileBytesStr = $("#AttestDoc" + attestIdSelected).val();

                                        var attesttypeId = data.id.split('_')[1];
                                        var obj = {
                                            Attest_Type_ID: attesttypeId,
                                            Contact_Relatie_ID: contactRelatieId,
                                            Bestandnaam: fileName,
                                            Bestand: fileBytesStr
                                        };
                                        attestenArr[idx] = obj;
                                        idx = idx + 1;
                                    }
                                });

                                var json2 = JSON.stringify(attestenArr);
                                jQuery.ajax({
                                    type: "POST",
                                    url: hostservernaam + "/API/DMZ/Inwoner/ToevoegenKandidaatAttest",
                                    data: json2,
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    success: function (data) {
                                        var test = "";

                                        var woningkeuzesArr = new Array();
                                        woningkeuzesArr.length = 0;
                                        var idx2 = 0;
                                        $("input[id*='keuzeBox_'").each(function (index, data) {
                                            var woningKeuzeBox = $("#" + data.id);
                                            if ($("#" + data.id).is(":checked")) {
                                                var woningkeuzeId = data.id.split('_')[1];
                                                var woningkeuzeDto = {
                                                    Woning_Keuze_ID: parseInt(woningkeuzeId),
                                                    Contact_Relatie_ID: contactRelatieId
                                                };
                                                woningkeuzesArr[idx2] = woningkeuzeDto;
                                                idx2 = idx2 + 1;
                                            }
                                        });

                                        var json3 = JSON.stringify(woningkeuzesArr);
                                        jQuery.ajax({
                                            type: "POST",
                                            url: hostservernaam + "/API/DMZ/Inwoner/SaveWoningKeuzes",
                                            data: json3,
                                            contentType: "application/json; charset=utf-8",
                                            dataType: "json",
                                            success: function (data) {
                                                var test = "";

                                                var komplexkeuzesArr = new Array();
                                                komplexkeuzesArr.length = 0;
                                                var index2 = 0;
                                                $("input[name='Komplex'").each(function (index, data) {
                                                    var komplexKeuzeBox = $("#"+data.id);
                                                    if ($("#"+data.id).is(":checked")) {
                                                        var komplexkeuzeId = data.id.split('-')[0];
                                                        var pandtypeID = data.id.split('-')[2];
                                                        var slpks = data.id.split('-')[1];
                                                        var komplexkeuzeDto = {
                                                            Komplex_ID: parseInt(komplexkeuzeId),
                                                            Pand_Type_ID: parseInt(pandtypeID),
                                                            Slaapkamers: parseInt(slpks),
                                                            Contact_Relatie_ID: contactRelatieId
                                                        };
                                                        komplexkeuzesArr[index2] = komplexkeuzeDto;
                                                        index2 = index2 + 1;
                                                    }
                                                });

                                                var json4 = JSON.stringify(komplexkeuzesArr);
                                                jQuery.ajax({
                                                    type: "POST",
                                                    url: hostservernaam + "/API/DMZ/Komplex/SaveKandidaatKomplexKeuzes",
                                                    data: json4,
                                                    contentType: "application/json; charset=utf-8",
                                                    dataType: "json",
                                                    success: function (data) {
                                                        var test = "";
                                                        alert("Online inschrijving kandidaat succesvol !!!");
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                },
                error: function (msg) {
                    var test = msg;
                },
            });
        }
    </script>