export const RoleEnum = {
    PATIENT: 'patient',
    DOCTOR: 'doctor',
    RECEPTIONIST: 'receptionist',
    LAB: 'lab',
    ADMIN: 'admin',
}

// الـ roles اللي بتسجل بكود (الـ patient من غير كود)
export const CODE_ROLES = [RoleEnum.DOCTOR, RoleEnum.RECEPTIONIST, RoleEnum.LAB, RoleEnum.ADMIN]
