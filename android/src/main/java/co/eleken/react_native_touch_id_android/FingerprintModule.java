package co.eleken.react_native_touch_id_android;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import android.hardware.fingerprint.FingerprintManager;
import android.os.Build;
import android.support.v4.app.ActivityCompat;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.github.ajalt.reprint.core.AuthenticationFailureReason;
import com.github.ajalt.reprint.core.AuthenticationListener;
import com.github.ajalt.reprint.core.Reprint;

/**
 * Created by Eleken. on 16.03.17.
 */

public class FingerprintModule extends ReactContextBaseJavaModule {
    
    
    public WritableMap response;
    private final ReactApplicationContext mReactContext;
    
    public FingerprintModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
    }
    
    @Override
    public String getName() {
        return "Fingerprint";
    }
    
    @ReactMethod
    public void requestTouch(final Callback callback) {
        
        response = Arguments.createMap();
        if (!isSensorAvailable()) {
            response.putString("status", "failed");
            response.putString("error", "Finger sensor is not available");
            callback.invoke(response);
            return;
        }
        
        Activity currentActivity = getCurrentActivity();
        
        if (currentActivity == null) {
            response.putString("error", "Can't find current Activity");
            callback.invoke(response);
            return;
        }
        
        Reprint.authenticate(new AuthenticationListener() {
            @Override
            public void onSuccess(int moduleTag) {
                response.putString("status", "ok");
                callback.invoke(response);
            }
            
            @Override
            public void onFailure(AuthenticationFailureReason failureReason, boolean fatal,
                                  CharSequence errorMessage, int moduleTag, int errorCode) {
                response.putString("status", "failed");
                response.putString("error", "Failed to read fingerprint");
                callback.invoke(response);
            }
        });
    }
    
    @ReactMethod
    public void dismiss() {
        Reprint.cancelAuthentication();
    }
    
    
    @ReactMethod
    public void isSensorAvailable(final Promise promise) {
        
        response = Arguments.createMap();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (ActivityCompat.checkSelfPermission(mReactContext, Manifest.permission.USE_FINGERPRINT) != PackageManager.PERMISSION_GRANTED) {
                response.putString("status", "failed");
                response.putString("error", "You haven't allow this app to use your fingerprint sensor");
                promise.resolve(response);
                return;
            }
            if (mReactContext.getPackageManager().hasSystemFeature(PackageManager.FEATURE_FINGERPRINT) ||
                ((FingerprintManager) mReactContext.getSystemService(Context.FINGERPRINT_SERVICE)).isHardwareDetected()) {
                if (((FingerprintManager) mReactContext.getSystemService(Context.FINGERPRINT_SERVICE)).hasEnrolledFingerprints()) {
                    response.putString("status", "ok");
                    promise.resolve(response);
                } else {
                    response.putString("status", "failed");
                    response.putString("error", "You have fingerprint sensor, but you should set it enabled in your settings to use with this app");
                    promise.resolve(response);
                }
            } else {
                response.putString("status", "failed");
                response.putInt("SDK_INT", Build.VERSION.SDK_INT);
                response.putInt("VERSION_CODES", Build.VERSION_CODES.M);
                response.putBoolean("hasSystemFeature", mReactContext.getPackageManager().hasSystemFeature(PackageManager.FEATURE_FINGERPRINT));
                response.putBoolean("isHardwareDetected", ((FingerprintManager) mReactContext.getSystemService(Context.FINGERPRINT_SERVICE)).isHardwareDetected());
                promise.resolve(response);
            }
        }
    }
    
    private boolean isSensorAvailable() {
        if (ActivityCompat.checkSelfPermission(mReactContext, Manifest.permission.USE_FINGERPRINT) != PackageManager.PERMISSION_GRANTED) {
            return false;
        }
        return Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && (mReactContext.getPackageManager().hasSystemFeature(PackageManager.FEATURE_FINGERPRINT) || ((FingerprintManager) mReactContext.getSystemService(Context.FINGERPRINT_SERVICE)).isHardwareDetected());
    }
}
