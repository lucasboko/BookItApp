export const useIsInRange =
    (
        geometryLib:  google.maps.GeometryLibrary | null,
        from: {lat: number, lng: number}, 
        to: {lat: number, lng: number}, 
        range: number
    ): boolean => {
        
        if (!from || !to || !geometryLib) return false
        
        const distance = geometryLib.spherical.computeDistanceBetween(
            new google.maps.LatLng(from),
            new google.maps.LatLng(to)
        )
        
        if (distance > range * 1000) {
            return false
        }

        return true;
    };