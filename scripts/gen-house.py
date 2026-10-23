import re
"""Génère la géométrie axonométrique de l'illustration du hero (src/components/home/HouseIllustration.tsx)."""
import math
S = 25.0
OX, OY = 250.0, 205.0
C, SN = math.cos(math.radians(30)), math.sin(math.radians(30))

def P(x, y, z):
    return ((x - y) * C * S + OX, (x + y) * SN * S - z * S + OY)

def poly(pts):
    return " ".join(f"{a:.1f},{b:.1f}" for a, b in (P(*p) for p in pts))

def roofz(y):  # mono-pente : 7 à l'arrière (y=0), 5 en façade (y=7)
    return 7 - 2 * (y / 7)

out = {}
# Sol
out["ground"] = poly([(-2.5, -1.5, 0), (17.5, -1.5, 0), (17.5, 9.8, 0), (-2.5, 9.8, 0)])
# Volume A
out["aFront"] = poly([(0, 7, 0), (10, 7, 0), (10, 7, 5), (0, 7, 5)])
out["aSide"] = poly([(10, 0, 0), (10, 7, 0), (10, 7, 5), (10, 0, 7)])
out["aRoof"] = poly([(-0.3, -0.3, roofz(-0.3)), (10.3, -0.3, roofz(-0.3)), (10.3, 7.3, roofz(7.3)), (-0.3, 7.3, roofz(7.3))])
out["aRoofEdge"] = poly([(-0.3, 7.3, roofz(7.3)), (10.3, 7.3, roofz(7.3)), (10.3, 7.3, roofz(7.3) - 0.35), (-0.3, 7.3, roofz(7.3) - 0.35)])
out["aRoofEdgeSide"] = poly([(10.3, -0.3, roofz(-0.3)), (10.3, 7.3, roofz(7.3)), (10.3, 7.3, roofz(7.3) - 0.35), (10.3, -0.3, roofz(-0.3) - 0.35)])
# Panneaux : 5 colonnes x 2 rangées
panels, cells = [], []
cols, rows = 5, 2
x0, x1, y0, y1 = 0.7, 9.3, 0.7, 6.3
gx, gy = 0.14, 0.18
pw = (x1 - x0 - gx * (cols - 1)) / cols
ph = (y1 - y0 - gy * (rows - 1)) / rows
for r in range(rows):
    for c in range(cols):
        ax = x0 + c * (pw + gx); bx = ax + pw
        ay = y0 + r * (ph + gy); by = ay + ph
        z = lambda y: roofz(y) + 0.12
        panels.append(poly([(ax, ay, z(ay)), (bx, ay, z(ay)), (bx, by, z(by)), (ax, by, z(by))]))
        # lignes de cellules (3 verticales, 2 horizontales)
        for k in range(1, 4):
            xx = ax + pw * k / 4
            cells.append((P(xx, ay, z(ay)), P(xx, by, z(by))))
        for k in range(1, 3):
            yy = ay + ph * k / 3
            cells.append((P(ax, yy, z(yy)), P(bx, yy, z(yy))))
out["panels"] = panels
out["cells"] = " ".join(f"M{a[0]:.1f} {a[1]:.1f}L{b[0]:.1f} {b[1]:.1f}" for a, b in cells)
# Ouvertures façade A
out["glazing"] = poly([(0.9, 7, 0), (4.4, 7, 0), (4.4, 7, 4.2), (0.9, 7, 4.2)])
out["glazingMullion"] = " ".join(
    f"M{P(x,7,0)[0]:.1f} {P(x,7,0)[1]:.1f}L{P(x,7,4.2)[0]:.1f} {P(x,7,4.2)[1]:.1f}" for x in (2.07, 3.23)
) + f" M{P(0.9,7,2.3)[0]:.1f} {P(0.9,7,2.3)[1]:.1f}L{P(4.4,7,2.3)[0]:.1f} {P(4.4,7,2.3)[1]:.1f}"
out["band"] = poly([(5.4, 7, 2.9), (9.3, 7, 2.9), (9.3, 7, 4.2), (5.4, 7, 4.2)])
out["door"] = poly([(5.4, 7, 0), (6.6, 7, 0), (6.6, 7, 2.3), (5.4, 7, 2.3)])
out["sideWindow"] = poly([(10, 1.2, 3.8), (10, 3.4, 3.8), (10, 3.4, 5.4), (10, 1.2, 5.4)])
# Volume B (annexe / garage)
out["bFront"] = poly([(10, 7, 0), (15, 7, 0), (15, 7, 3.2), (10, 7, 3.2)])
out["bSide"] = poly([(15, 1.5, 0), (15, 7, 0), (15, 7, 3.2), (15, 1.5, 3.2)])
out["bTop"] = poly([(10, 1.5, 3.2), (15, 1.5, 3.2), (15, 7, 3.2), (10, 7, 3.2)])
out["bAcro"] = poly([(10, 7, 3.2), (15, 7, 3.2), (15, 7, 3.45), (10, 7, 3.45)])
out["bAcroSide"] = poly([(15, 1.5, 3.2), (15, 7, 3.2), (15, 7, 3.45), (15, 1.5, 3.45)])
out["garage"] = poly([(10.8, 7, 0), (14.2, 7, 0), (14.2, 7, 2.5), (10.8, 7, 2.5)])
out["garageLines"] = " ".join(
    f"M{P(10.8,7,z)[0]:.1f} {P(10.8,7,z)[1]:.1f}L{P(14.2,7,z)[0]:.1f} {P(14.2,7,z)[1]:.1f}" for z in (0.5, 1.0, 1.5, 2.0)
)
# Équipements sur la façade latérale de B
def box(y0, y1, z0, z1, d=0.25):
    return {
        "face": poly([(15 + d, y0, z0), (15 + d, y1, z0), (15 + d, y1, z1), (15 + d, y0, z1)]),
        "top": poly([(15, y0, z1), (15, y1, z1), (15 + d, y1, z1), (15 + d, y0, z1)]),
        "front": poly([(15, y1, z0), (15 + d, y1, z0), (15 + d, y1, z1), (15, y1, z1)]),
    }
out["battery"] = box(2.4, 4.0, 0.3, 2.4, 0.35)
out["inverter"] = box(4.6, 5.7, 1.4, 2.4, 0.22)
out["batteryLed"] = poly([(15.36, 3.0, 2.0), (15.36, 3.4, 2.0), (15.36, 3.4, 2.1), (15.36, 3.0, 2.1)])
# Flux d'énergie : panneaux -> rive -> descente -> onduleur -> batterie
pts = [P(9.3, 6.3, roofz(6.3) + 0.12), P(10.3, 7.3, roofz(7.3) - 0.35), P(10.3, 7.3, 3.45)]
pts += [P(15, 7, 3.45), P(15.22, 5.7, 1.9), P(15.35, 4.0, 1.9)]
out["flow"] = "M" + " L".join(f"{a:.1f} {b:.1f}" for a, b in pts)
# Points d'ancrage des légendes
out["aPanel"] = P(5, 1.8, roofz(1.8) + 0.12)
out["aInverter"] = P(15.22, 5.15, 1.9)
out["aBattery"] = P(15.35, 3.2, 1.3)
out["aMeter"] = P(7.2, 7, 1.4)
out["meter"] = poly([(6.9, 7, 1.0), (7.5, 7, 1.0), (7.5, 7, 1.8), (6.9, 7, 1.8)])
out["tree"] = P(-1.2, 9, 0)
import json, sys
xs=[];ys=[]
for v in out.values():
    for m in re.findall(r"(-?\d+\.?\d*),(-?\d+\.?\d*)", json.dumps(v)):
        xs.append(float(m[0])); ys.append(float(m[1]))
print("bounds", min(xs), max(xs), min(ys), max(ys), file=sys.stderr)
json.dump(out, open(sys.argv[1], "w"), indent=1)
