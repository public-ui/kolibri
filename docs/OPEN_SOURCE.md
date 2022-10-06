# Open Source Prozess

In diesem Dokument wird der Prozess und dessen Teilprozesse zum Aufbau des Open Source Projekts dargestellt.

Im folgenden Diagramm wird der Gesamtprozess kompakt dargestellt:

```mermaid
flowchart
  idStart((Start))
  idStartNode(("•"))
  idStart --> idStartNode
  idStartNode --> idNPM[[NPM einrichten]]
  idStartNode --> idGitHub[[GitHub einrichten]]
  idStartNode --> idRepository[[Repository aufbereiten]]
  idStartNode --> idTeam[[Team organisieren]]
  idStartNode --> idTrademark[[Marke schützen]]
  idStartNode --> idLicense[[Lizenz prüfen]]
  idNPM --> idEndNode
  idGitHub --> idEndNode
  idRepository --> idEndNode
  idTeam --> idEndNode
  idTrademark --> idEndNode
  idLicense --> idEndNode
  idEndNode(("•"))
  idEndNode --> idLeitung{Leitungsfreigabe}
  idLeitung -- ja --> idHistory[Historie bereinigen]
  idLeitung -- nein --> idStartNode
  idHistory --> idPublicCode[Quellcode veröffentlichen]
  idNPM --> idFreigabe{Freigabe}
  idFreigabe -- ja --> idPublicPkg[Artefakte bereitstellen]
  idFreigabe -- nein --> idStartNode
  idPublicPkg --> idEnd
  idPublicCode --> idEnd
  idEnd(((Ende)))
```

## Teilprozesse

### NPM einrichten

```mermaid
flowchart
  idStart((Start))
  idStart --> idOrg[Organisation anlegen]
  idOrg --> idOwner[Vertreter hinzufügen]
  idOwner --> idStartNode(("•"))
  idStartNode --> idMeta[Meta-Daten hinterlegen]
  idStartNode --> id2FA[2FA aktivieren]
  idMeta --> idEndNode(("•"))
  id2FA --> idEndNode
  idEndNode --> idEnd
  idEnd(((Ende)))
```

### GitHub einrichten

```mermaid
flowchart
  idStart((Start))
  idStart --> idOrg[Organisation anlegen]
  idOrg --> idOwner[Vertreter hinzufügen]
  idOwner --> idStartNode(("•"))
  idStartNode --> idMeta[Meta-Daten hinterlegen]
  idStartNode --> idRoles[Rollen anlegen]
  idStartNode --> id2Sec[Sicherheit einrichten]
  idStartNode --> idPage[Website einrichten]
  idStartNode --> idForum[Forum einrichten]
  idStartNode --> idRepo[Repository einrichten]
  idRepo --> idSelectCont[Contributor auswählen]
  idSelectCont --> idCodePush[Code hochladen]
  idCodePush --> idPipeline[Pipelines einrichten]
  idPipeline --> idSecret[Secrets einstellen]
  id2Sec --> idSecNode(("•"))
  idSecNode --> id2FA[2FA aktivieren]
  idSecNode --> idAnaly[Security Analyse aktivieren]
  idSecNode --> idDomain[Domain verifizieren]
  idPage --> idLanding[Landing Page einrichten]
  idLanding --> idPageStyle[CD einrichten]
  id2FA --> idEndSecNode(("•"))
  idAnaly --> idEndSecNode(("•"))
  idDomain --> idEndSecNode(("•"))
  idRoles --> idUser[Contributor hinzufügen]
  idUser --> idRole[Rolle zuweisen]
  idEndNode(("•"))
  idSecret --> idEndNode
  idMeta --> idEndNode
  idForum --> idEndNode
  idEndSecNode --> idEndNode
  idPageStyle --> idEndNode
  idRole --> idEndNode
  idEndNode --> idEnd
  idEnd(((Ende)))
```

### Repository aufbereiten

```mermaid
flowchart
  idStart((Start)) --> idStartNode(("•"))
  idStartNode --> idCoC[Code of Conduct anlegen]
  idStartNode --> idCont[Contributing schreiben]
  idStartNode --> idCla[CLA schreiben]
  idStartNode --> idChange[Changelog schreiben]
  idStartNode --> idCleanup[Interna bereinigen]
  idEndNode(("•"))
  idCoC --> idEndNode
  idCont --> idEndNode
  idCla --> idEndNode
  idChange --> idEndNode
  idCleanup --> idEndNode
  idEndNode --> idHistory[History bereinigen]
  idHistory -->  idEnd(((Ende)))
```

### Team organisieren

```mermaid
flowchart
  idStart((Start)) --> idOwner[Service-Owner festlegen]
  idOwner --> idStartNode(("•"))
  idStartNode --> idWeekly[Austausch einrichten]
  idStartNode --> idManifest[Manifest verfassen]
  idStartNode --> idStandard[Standard beschließen]
  idStartNode --> idMoney[Finanzierung klären]
  idEndNode(("•"))
  idWeekly --> idEndNode
  idManifest --> idEndNode
  idStandard --> idEndNode
  idMoney --> idEndNode
  idEndNode -->  idEnd(((Ende)))
```
